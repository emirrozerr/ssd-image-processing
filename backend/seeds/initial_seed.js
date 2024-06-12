/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// seeds/initial_seed.js
// seeds/initial_seed.js
// seeds/initial_seed.js
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert([
        {Email: 'admin@example.com', Name: 'Admin'},
        {Email: 'example1@example.com', Name: 'User One'},
        {Email: 'example2@example.com', Name: 'User Two'}
      ]);
    });
};



