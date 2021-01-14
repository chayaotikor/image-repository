exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments("id").primary().unsigned();
    tbl.string("email").notNullable().unique();
    tbl.string("password").notNullable();
    tbl.string("username").notNullable().unique();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
