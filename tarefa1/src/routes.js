const { Router } = require("express");
const express = require("express");
const routes = express.Router();
const DB = require('./characters');

routes.get("/characters", (req, res) => {
    return res.json(DB.characters);
});

routes.get("/characters/:id", (req, res) => {
    if(isNaN(req.params.id))
        return res.sendStatus(400);
    else {
        const id = parseInt(req.params.id);
        const character = DB.characters.find((c) => c.id == id);
        if(character != undefined) {
            return res.json(character);
        } else {
            return res.status(404).json({ msg: "Personagem não encontrado." });
        }
    }
});

routes.post("/newCharacter", (req, res) => {
    //const name = req.body.name;
    const {
        name,
        species,
        house,
        ancestry,
        wand,
        hogwartsStudent,
        hogwartsStaff,
    } = req.body;
    if(name && species && house != undefined) {
        const id = DB.characters.length + 1; // pode usar uuid para criar numeros aleatorios, pequeno bug de id
        DB.characters.push({
            id,
            name,
            species,
            house,
            ancestry,
            wand,
            hogwartsStudent,
            hogwartsStaff,
        });
        return res.json( { msg: "Personagem criado com sucesso."} );
    } else {
        return res.status(400).json({ msg: "Dados obrigatórios não informados" });
    }
});

routes.delete("/characters/:id", (req, res) => {
    if(isNaN(req.params.id))
        return res.sendStatus(400);
    else {
        const id = parseInt(req.params.id);
        const index = DB.characters.findIndex((c) => c.id == id);
        if(index != -1) {
            character = DB.characters.splice(index, 1);  //a partir da posição index tira 1
            return res.json({ msg: "Personagem excluído com sucesso.", character, });
        } else {
            return res.status(404).json({ msg: "Personagem não encontrado." });
        }
    }
});

routes.put("/character/:id", (req, res) => {
    if(isNaN(req.params.id))
        return res.sendStatus(400);
    else {
        const id = parseInt(req.params.id);
        const character = DB.characters.find((c) => c.id == id);
        if (character != undefined) {
            const {
                name,
                species,
                house,
                ancestry,
                wand,
                hogwartsStudent,
                hogwartsStaff,
            } = req.body;
            if (name != undefined) character.name = name;
            if (species != undefined) character.species = species;
            if (house != undefined) character.house = house;
            if (ancestry != undefined) character.ancestry = ancestry;
            if (wand != undefined) character.wand = wand;
            if (hogwartsStudent != undefined) character.hogwartsStudent = hogwartsStudent;
            if (hogwartsStaff != undefined) character.hogwartsStaff = hogwartsStaff;
            return res.json(character);
        } else {
            return res.status(404).json({ msg: "Personagem não encontrado" });
        }
    }
})

module.exports = routes;