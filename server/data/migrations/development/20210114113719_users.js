exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments("id").primary().unsigned();
    tbl.string("email").notNullable().unique();
    tbl.string("password").notNullable();
    tbl.string("username").notNullable().unique();
    tbl
      .specificType("favorites", "integer ARRAY")
      .unsigned()
      .references("id")
      .inTable("images")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
