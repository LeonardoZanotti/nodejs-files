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
    {
      id: 2,
      name: 'São Paulo',
      city: 'São Paulo',
      state: 'São Paulo',
      series: 'C', // A, B, C or NULL
      titles: [
        {
          name: 'Campeão do campeonato brasileiro',
          type: 'nacional', // estadual, nacional ou internacional
        },
        {
          name: 'Campeão da copa do mundo',
          type: 'internacional', // estadual, nacional ou internacional
        },
      ],
      payroll: 'R$ 17500,00',
    },
    {
      id: 3,
      name: 'Grêmio',
      city: 'Porto Alegre',
      state: 'Rio Grande do Sul',
      series: '', // A, B, C or NULL
      titles: [],
      payroll: 'R$ 0,75',
    },
  ],
};

module.exports = DB;
