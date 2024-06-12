// migrations/YYYYMMDDHHMMSS_create_modified_image_table.js
exports.up = function(knex) {
  return knex.schema.createTable('ModifiedImage', function(table) {
    table.increments('Id').primary();
    table.string('Name', 255).notNullable();
    table.string('Path', 255).notNullable();
    table.integer('OriginalImage_id').unsigned().references('Id').inTable('OriginalImage').onDelete('CASCADE');
    table.unique(['Name', 'Path']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ModifiedImage');
};
