exports.up = function(knex) {
    return knex.schema.alterTable('OriginalImage', function(table) {
      table.dropUnique(['Name', 'Path']);
      table.unique('Path'); // If you still want 'Path' to be unique by itself
    });
  };
  
exports.down = function(knex) {
    return knex.schema.alterTable('OriginalImage', function(table) {
      table.unique(['Name', 'Path']);
    });
};
  
