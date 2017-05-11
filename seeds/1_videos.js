exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('videos').del()
    .then(function() {
      // Inserts seed entries
      return knex('videos').insert([{
          id: 1,
          title: 'talk to her',
          director: 'Pedro Almodóvar',
          duration: '1h 52min'
        },
        {
          id: 2,
          title: 'Dog Star Man',
          director: 'Stan Brakhage',
          duration: '1h 18min'
        },
        {
          id: 3,
          title: 'Fantasia',
          director: 'James Algar, etc',
          duration: '2h 5min'
        }
      ]);
    });
};
