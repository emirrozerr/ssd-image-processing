// migrations/YYYYMMDDHHMMSS_create_user_table.js
exports.up = function(knex) {
  return knex.schema.createTable('User', function(table) {
    table.increments('Id').primary();
    table.string('Email', 255).notNullable().unique();
    table.string('Name', 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('User');
};
