const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Sequelize = require('sequelize');
const Physician = require('../models/Physician');

module.exports = {
  async newAppointment(req, res) {
    const { physicianId, patientId, description } = req.body;
    const appointmentDate = new Date(req.body?.appointmentDate);
    console.log(appointmentDate);
    if (!physicianId || !patientId || !description || !appointmentDate) {
      res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });
    }

    const appointmentExists = await Appointment.findOne({
      where: { physicianId, appointmentDate },
    });

    if (appointmentExists) res.status(403).json({ msg: 'Já há uma consulta para este horário.' });
    else {
      const appointment = await Appointment.create({
        physicianId,
        patientId,
        description,
        appointmentDate,
      }).catch((error) => {
        res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
      });
      return appointment
        ? res.status(201).json({ msg: 'Consulta marcada.' })
        : res.status(400).json({ msg: 'Não foi possível agendar a consulta.' });
    }
  },

  async searchAppointmentByPatientId(req, res) {
    const patientId = req.params?.id;
    if (!patientId) res.status(400).json({ msg: 'Parâmetro id está vazio.' });
    const appointments = await Appointment.findAll({
      where: { patientId },
    });
    return appointments
      ? res.status(200).json({ appointments })
      : res.status(404).json({ msg: 'Paciente não encontrado.' });
  },

  async searchAppointmentByPhysicianId(req, res) {
    const physicianId = req.params?.id;
    if (!physicianId) res.status(400).json({ msg: 'Parâmetro id está vazio.' });
    const appointments = await Appointment.findAll({
      where: { physicianId },
    });
    return appointments
      ? res.status(200).json({ appointments })
      : res.status(404).json({ msg: 'Médico não encontrado.' });
  },

  async deleteAppointment(req, res, next) {
    const appointmentId = req.params?.id;

    const deletedPhysician = await Appointment.destroy({
      where: { id: appointmentId },
    });

    return deletedPhysician
      ? res.status(200).json({ msg: 'Consulta excluída com sucesso.' })
      : res.status(404).json({ msg: 'Consulta não encontrada.' });
  },
};
