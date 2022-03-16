const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Sequelize = require('sequelize');

module.exports = {
  async newPatient(req, res) {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });

    //Procura no BD por patient já existente
    const isPatientNew = await Patient.findOne({
      where: { email },
    });

    if (isPatientNew) return res.status(403).json({ msg: 'Paciente já foi cadastrado.' });
    else {
      const patient = await Patient.create({
        name,
        email,
        phone,
      }).catch((error) => {
        return res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
      });
      return patient
        ? res.status(201).json({ msg: 'Novo paciente foi adicionado.' })
        : res.status(400).json({ msg: 'Não foi possível cadastrar novo patient.' });
    }
  },

  // pesquisar por nome
  async searchPatientByName(req, res) {
    const { name } = req.params;
    if (!name) return res.status(400).json({ msg: 'Parâmetro nome está vazio.' });
    else {
      const Op = Sequelize.Op;
      const patient = await Patient.findAll({
        where: { name: { [Op.like]: '%' + name + '%' } },
        include: { model: Appointment, as: 'appointmentsPatient' },
      });
      return patient && patient != ''
        ? res.status(200).json({ patient })
        : res.status(404).json({ msg: 'Paciente não encontrado.' });
    }
  },

  // pesquisar paciente pelo id do médico
  async searchPatientByPhysicianId(req, res) {
    const physicianId = req.params?.id;
    if (!physicianId) return res.status(400).json({ msg: 'Parâmetro id está vazio.' });

    const patients = await Patient.findAll({
      include: { model: Appointment, as: 'appointmentsPatient' },
      where: { '$appointmentsPatient.physicianId$': physicianId },
    });

    return patients && patients != ''
      ? res.status(200).json({ patients })
      : res.status(404).json({ msg: 'Médico não possui pacientes.' });
  },

  //editar patient
  async updatePatient(req, res) {
    const patientId = req.params?.id;
    const patient = req.body;
    if (!patientId) res.status(400).json({ msg: 'ID do paciente vazio.' });
    else {
      const patientExists = await Patient.findByPk(patientId);
      if (!patientExists) return res.status(404).json({ msg: 'Paciente não encontrado.' });
      if (patient.name || patient.email || patient.phone) {
        await Patient.update(patient, {
          where: { id: patientId },
        });
        return res.status(200).json({ msg: 'Paciente atualizado com sucesso.' });
      }
      return res.status(400).json({ msg: 'Campos obrigatórios não preenchidos.' });
    }
  },
};
