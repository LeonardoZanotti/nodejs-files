var DB = {
  teams: [
    {
      id: 1,
      name: 'Coritiba',
      city: 'Curitiba',
      state: 'Paraná',
      series: 'A', // A, B, C or NULL
      titles: [
        {
          name: 'Campeão do campeonato paranaense',
          type: 'estadual', // estadual, nacional ou internacional
        },
      ],
      payroll: 'R$ 2500,00',
    },
  ],
};

module.exports = DB;
