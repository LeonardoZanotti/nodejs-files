const express = require('express');
const routes = express.Router();
const DB = require('./teams');

const availableSeries = ['A', 'B', 'C', ''];

routes.get('/teams', (req, res) => {
  if (req.query.search) {
    const { search } = req.query;
    const teams = DB.teams.find((t) => t.name.toLowerCase().includes(search.toLowerCase()));
    return teams ? res.json(teams) : res.status(404).json({ msg: 'Time não encontrado.' });
  }

  return res.json(DB.teams);
});

routes.post('/teams', (req, res) => {
  const { name, city, state, series, titles, payroll } = req.body;
  if (name && city && state && availableSeries.includes(series)) {
    const id = DB.teams.length + 1;
    DB.teams.push({
      id,
      name,
      city,
      state,
      series,
      titles,
      payroll,
    });
    return res.json({ msg: 'Time criado com sucesso.' });
  } else {
    return res.status(400).json({ msg: 'Dados obrigatórios não informados' });
  }
});

routes.delete('/teams/:id', (req, res) => {
  if (isNaN(req.params.id)) return res.sendStatus(400);
  else {
    const id = parseInt(req.params.id);
    const index = DB.teams.findIndex((t) => t.id == id);
    if (index != -1) {
      const team = DB.teams.splice(index, 1);
      return res.json({ msg: 'Time excluído com sucesso.', team });
    } else {
      return res.status(404).json({ msg: 'Time não encontrado.' });
    }
  }
});

routes.put('/teams/:id', (req, res) => {
  if (isNaN(req.params.id)) return res.sendStatus(400);
  else {
    const id = parseInt(req.params.id);
    const team = DB.teams.find((t) => t.id == id);
    if (team) {
      const { name, city, state, series, titles, payroll } = req.body;
      if (name) team.name = name;
      if (city) team.city = city;
      if (state) team.state = state;
      if (availableSeries.includes(series)) team.series = series;
      if (titles) team.titles = titles;
      if (payroll) team.payroll = payroll;
      return res.json(team);
    } else {
      return res.status(404).json({ msg: 'Time não encontrado' });
    }
  }
});

module.exports = routes;
