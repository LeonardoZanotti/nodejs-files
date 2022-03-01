const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Physician = require('../models/Physician');

module.exports = {
    async newPatient(req, res) {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos." });
        }

        //Procura no BD por patient já existente
        const isPatientNew = await Patient.findOne({
            where: { name },
        });

        if(isPatientNew)
            res.status(403).json({ msg: "Patient já foi cadastrado." });
        else {
            const patient = await Patient.create({
                name, 
                email,
                phone,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados." });
            });
            if(patient)
                res.status(201).json({ msg: "Novo patient foi adicionado." });
            else
                res.status(404).json({ msg: "Não foi possível cadastrar novo patient." });
        }
    },

    // pesquisar por nome
    async searchPatientByName(req, res) {
        const name = req.body.name;
        if (!name)
            res.status(400).json({ msg: "Parâmetro nome está vazio.", });
        const Op = Sequelize.Op;
        const patient = await Patient.findAll({
            where: { name: { [Op.like]: "%" + name + "%" }},
        });
        if (patient) {
            if(patient == "")
                res.status(404).json({ msg: "Patient não encontrado." });
            else res.status(200).json({ patient });
        } else res.status(404).json({ msg: "Patient não encontrado." });
    },

    // pesquisar paciente pelo id do médico
    async searchPatientByPhysicianId(req, res) {
        const physicianId = req.params.id;
        if (!physicianId)
            res.status(400).json({ msg: "Parâmetro id está vazio." });
        const appointments = await Appointment.findAll({
            where: { physicianId: physicianId },
        });
        if (appointments) {
            if(appointments == "")
                res.status(404).json({ msg: "Physician não encontrado." });
            else res.status(200).json({ appointments });
        } else
                res.status(404).json({ msg: "Physician não encontrado." });
    },

    //editar patient
    async updatePatient(req, res) {
        const patientId = req.params.id;
        const patient = req.body;
        if(!patientId)
            res.status(400).jscon({ msg: "ID do patientr vazio." });
        else {
            const patientExists = await Patient.findByPk(patientId);
            if(!PatientExists)
                res.status(404).json({ msg: "Patient não encontrado." });
            else {
                if (patient.name || patient.email || patient.phone) {
                    await Patient.update(patient, {
                        where: { id: patientId },
                    });
                    return res.status(200).json({ msg: "Patient atualizado com sucesso." });
                } else
                    return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
            }
        }
    },

};
