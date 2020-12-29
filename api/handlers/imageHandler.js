var cloudinary = require("cloudinary").v2;

const uploadToCloudinary = async (image, hashId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image,
      { public_id: hashId, secure: true },
      (err, url) => {
        if (err) return reject(err);
        return resolve(url);
      }
    );
  });
};

class ImageHandler {
  static async uploadImage(req, res) {
    const { secure_url } = await uploadToCloudinary(
      req.body.data.image,
      req.body.data.recipeId
    );
    // const secondary = await uploadToImgur(req.body.image);

    res.send({ link: secure_url });
  }
}
module.exports = {
  ImageHandler: ImageHandler,
};
