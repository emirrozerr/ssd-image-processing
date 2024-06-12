// migrations/YYYYMMDDHHMMSS_create_original_image_table.js
exports.up = function(knex) {
  return knex.schema.createTable('OriginalImage', function(table) {
    table.increments('Id').primary();
    table.string('Name', 255).notNullable();
    table.string('Path', 255).notNullable();
    table.integer('User_id').unsigned().references('Id').inTable('User').onDelete('CASCADE');
    table.unique(['Name', 'Path']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('OriginalImage');
};
