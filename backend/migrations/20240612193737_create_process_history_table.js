// migrations/YYYYMMDDHHMMSS_create_process_history_table.js
exports.up = function(knex) {
  return knex.schema.createTable('ProcessHistory', function(table) {
    table.increments('Id').primary();
    table.integer('User_id').unsigned().references('Id').inTable('User').onDelete('CASCADE');
    table.integer('OriginalImage_id').unsigned().references('Id').inTable('OriginalImage').onDelete('CASCADE');
    table.integer('ModifiedImage_id').unsigned().references('Id').inTable('ModifiedImage').onDelete('CASCADE');
    table.timestamp('CreationDate').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('UpdateDate').defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ProcessHistory');
};
