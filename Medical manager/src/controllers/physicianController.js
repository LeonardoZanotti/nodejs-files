const Physician = require('../models/Physician');
const Appointment = require('../models/Appointment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const passwordValidation = (password) => {
  if (password.length < 8) return 'Senha deve ter no mínimo 8 caracteres.';
  else if (!password.match(/[a-zA-Z]/g)) return 'Senha deve ter no mínimo uma letra.';
  else if (!password.match(/[0-9]+/g)) return 'Senha deve ter no mínimo um número.';
  else return 'OK';
};

function generateToken(id) {
  process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 82800 }); // Token expira em 24 horas
  return token;
}

module.exports = {
  async authentication(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Campos obrigatórios vazios' });
    try {
      const physician = await Physician.findOne({ where: { email } });
      const token = generateToken(physician.id);
      return physician && bcrypt.compareSync(password, physician.password)
        ? res.status(200).json({ msg: 'Autenticado com sucesso', token })
        : res.status(404).json({ msg: 'Usuário ou senha inválidos' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  async listAllPhysicians(req, res, next) {
    const physicians = await Physician.findAll({
      include: { model: Appointment, as: 'appointmentsPhysician' },
      order: [['name', 'ASC']],
    }).catch((err) => {
      return res.status(500).json({ msg: 'Falha na conexão.' });
    });
    return physicians
      ? res.status(200).json({ physicians })
      : res.status(404).json({ msg: 'Não foi possível encontrar médicos.' });
  },

  async newPhysician(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(404).json({ msg: 'Dados obrigatórios não foram preenchidos.' });

    const passwordValid = passwordValidation(password);
    if (passwordValid !== 'OK') return res.status(400).json({ msg: passwordValid });

    const physicianExists = await Physician.findOne({ where: { email } });
    if (physicianExists) return res.status(403).json({ msg: 'Médico já cadastrado.' });
    else {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(password, salt);
      const physician = await Physician.create({
        name,
        email,
        password: hash,
      }).catch((err) => {
        return res.status(500).json({ msg: 'Falha na conexão.' });
      });

      return physician
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
