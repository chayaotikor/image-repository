const db = require("../../config/dbConfig");


module.exports = {
  getAll: async () => {
    const allImages = await db("images");

    return allImages;
  },

  getImage: async (id) => {
    const image = await db("images").where({ id }).first();
      
    return image;
  },

  addImage: async (image) => {
    const newImageId = await db("images")
      .insert({...image})
      .returning("id")
      .then((id) => {
        return id;
      });

    return newImageId[0];
  },

  updateImage: async (id, image) => {
    const updateCount = await db("images")
      .where("id", id)
      .update(image);
    return updateCount;
  },

  deleteImage: async (id) => {
    const deleteCount = await db("images").where({ id }).del();
    return deleteCount;
  },
};
