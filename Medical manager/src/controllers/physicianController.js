const Physician = require('../models/Physician');
const Appointment = require('../models/Appointment');

module.exports = {
  async listAllPhysicians(req, res, next) {
    const physicians = await Physician.findAll({
      include: [{ model: Appointment, as: 'appointments' }],
      order: [['name', 'ASC']],
    }).catch((err) => {
      res.status(500).json({ msg: 'Falha na conexão.' });
    });
    return physicians
      ? res.status(200).json({ physicians })
      : res.status(404).json({ msg: 'Não foi possível encontrar médicos.' });
  },

  async newPhysician(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(404).json({ msg: 'Dados obrigatórios não foram preenchidos.' });

    const physicianExists = await Physician.findOne({ where: { email } });
    if (physicianExists) return res.status(403).json({ msg: 'Médico já cadastrado.' });
    else {
      const physician = await Physician.create({
        name,
        email,
        password,
      }).catch((err) => {
        res.status(500).json({ msg: 'Falha na conexão.' });
      });

      physician
        ? res.status(201).json({ msg: 'Médico criado com sucesso.' })
        : res.status(400).json({ msg: 'Não foi possível cadastrar novo médico.' });
    }
  },

  async updatePhysician(req, res, next) {
    const physicianId = req.params?.id;
    const physician = req.body;

    const physicianExists = await Physician.findByPk(physicianId);
    if (!physicianExists) return res.status(404).json({ msg: 'Médico não existe.' });

    if (physician.name || physician.email || physician.password) {
      const physicianWithEmail = await Physician.findOne({ where: { email: physician.email } });
      if (physicianWithEmail && physicianWithEmail.id != physician.id)
        return res.status(400).json({ msg: 'Outro médico já usa este email.' });

      await Physician.update(physician, { where: { id: physicianId } });
      return res.status(200).json({ msg: 'Médico atualizado com sucesso.' });
    } else return res.status(400).json({ msg: 'Campos obrigatórios não preenchidos.' });
  },

  async deletePhysician(req, res, next) {
    const physicianId = req.params?.id;

    const appointmentExists = await Appointment.findOne({ where: { physicianId } });
    if (appointmentExists) return res.status(403).json({ msg: 'Médico possui consultas.' });

    const deletedPhysician = await Physician.destroy({
      where: { id: physicianId },
    });

    return deletedPhysician
      ? res.status(200).json({ msg: 'Médico excluído com sucesso.' })
      : res.status(404).json({ msg: 'Médico não encontrado.' });
  },
};
