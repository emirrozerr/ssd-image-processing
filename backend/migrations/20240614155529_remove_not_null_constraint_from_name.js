exports.up = function(knex) {
    return knex.schema.alterTable('OriginalImage', function(table) {
      table.dropUnique(['Name', 'Path']);
      table.unique('Path'); 
      table.string('Name', 255).nullable().alter();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('OriginalImage', function(table) {
      table.unique(['Name', 'Path']);
      table.string('Name', 255).notNullable().alter();
    });
  };
  