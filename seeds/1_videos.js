exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('videos').del()
    .then(function() {
      // Inserts seed entries
      return knex('videos').insert([{
          id: 1,
          title: 'rowValue1',
          director: 'You',
          duration: '90 minutes'
        },
        {
          id: 2,
          title: 'rowValue2',
          director: 'Me',
          duration: '255 years'
        },
        {
          id: 3,
          title: 'Talk to her',
          director: 'pedro almodovar',
          duration: '85 mintues'
        }
      ]);
    });
};
