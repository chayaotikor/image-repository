exports.up = function (knex, Promise) {
  return knex.schema.createTable("favorites", (tbl) => {
    tbl.increments("id").primary().unsigned();
    tbl.integer("userID").unsigned().references("id").inTable("users");
    tbl.integer("imageID").unsigned().references("id").inTable("images");
    tbl.unique(["userID", "imageID"]);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("favorites");
};
