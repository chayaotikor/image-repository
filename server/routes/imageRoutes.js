const express = require("express");
const router = express.Router();
const db = require("../data/resolvers/imagesResolver");
const responseStatus = require("../config/responseStatusConfig");

router.get("/", async (req, res, next) => {
  try {
    const images = await db.getAll();
    res.status(responseStatus.success).json({ images });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const image = await db.getImage(id);
    res.status(responseStatus.success).json({ image });
  } catch (err) {
    if (TypeError) {
      next(responseStatus.typeError);
    } else {
      next(err);
    }
  }
});

router.post("/", async (req, res, next) => {
  const { data, name, mimetype } = req.files.data;
  const { tags, created_by } = req.body
  
  console.log("BODY",req.body, "FILES", req.files.data)
  console.log("files",req.files)
  try {
    const newImageId = await db.addImage({data,name, mimetype,tags, created_by});
    res.status(responseStatus.postCreated).json({ newImageId });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedRecords = await db.updateImage(id, body);
    res.status(responseStatus.success).json({ updatedRecords });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await db.deleteImage(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
