const { Query } = require("pg");
const db = require("../../config/dbConfig");

module.exports = {
  registerUser: async (creds) => {
    const id = await db("users").insert(creds).first();
    const query = await db("users").where({ id }).first();
    return query;
  },

  loginUser: async (creds) => {
    const user = await db("users").where({ email: creds.email }).first();
    return user;
  },

  getUser: (id) => {
    const user = db("users").select("username").where({ id }).first();
    const uploaded = db("images").where("created_by", id);
    const favorites = db("images")
      .join("favorites", "images.id", "favorites.imageID")
      .join("users", "favorites.userID", "users.id")
      .where({ id });

    return Promise.all([user, uploaded, favorites]).then((res) => {
      let [user, uploaded, favorites] = res;
      let result = {
        username: user.username,
        uploaded: [...uploaded],
        favorites: [...favorites],
      };

      return result;
    });
  },

  updateUser: async (id, user) => {
    const count = await db("users").where({ id }).update(user);

    return count;
  },

  deleteUser: async (id) => {
    const count = await db("users").where({ id }).del();

    return count;
  },
};
