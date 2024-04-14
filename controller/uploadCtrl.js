const fs = require("fs");
const asyncHandler = require("express-async-handler");
const HttpError = require("../config/error");

const { cloudinaryUploadImg, cloudinaryDeleteImg } = require("../utils/cloudinary");
const { log } = require("sharp/lib/libvips");
const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");

    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const text = path.split("\\");
      text.pop();
      text.push("products", file.filename);
      let fixPath = text.join("\\\\");
      const newpath = await uploader(fixPath);
      // console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
      fs.unlinkSync(fixPath);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
