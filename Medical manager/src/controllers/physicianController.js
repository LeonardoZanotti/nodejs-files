// newPhysician, updatePhysician, deletePhysician;

const Physician = require('../models/Physician');

module.exports = {
  async listAllPhysicians(req, res, next) {
    const physicians = await Physician.findAll({
      order: [['name', 'ASC']],
    }).catch((err) => {
      res.status(500).json({ msg: 'Falha na conexão.' });
    });
    return physicians
      ? res.status(200).json({ physicians })
      : res.status(404).json({ msg: 'Não foi possível encontrar médicos.' });
  },
};
