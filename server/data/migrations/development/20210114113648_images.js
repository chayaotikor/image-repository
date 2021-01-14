exports.up = function (knex, Promise) {
  return knex.schema.createTable("images", (tbl) => {
    tbl.increments("id").primary().unsigned();
    tbl.string("name").notNullable();
    tbl.string("data").notNullable();
    tbl.integer("favorite_count").unsigned().notNullable();
    tbl.specificType("tags", "string ARRAY");
    tbl
      .integer("created_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("images");
};
