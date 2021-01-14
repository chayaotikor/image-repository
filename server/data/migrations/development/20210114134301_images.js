exports.up = function (knex, Promise) {
  return knex.schema.createTable("images", (tbl) => {
    tbl.increments("id").primary().unsigned();
    tbl.string("name").notNullable();
    tbl.binary("data").notNullable();
    tbl.string('mimetype').notNullable()
    tbl.specificType("tags", "text ARRAY");
    tbl
      .integer("created_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("images");
};
