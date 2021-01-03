import { UploadApiResponse, v2 } from "cloudinary";
import { config } from "../../config";

const uploadToCloudinary = async (
  image,
  hashId
): Promise<UploadApiResponse> => {
  const env = config.isLocal ? "loc" : "prod";
  const ms = new Date().getTime();
  return new Promise((resolve, reject) => {
    v2.uploader.upload(
      image,
      { public_id: `${hashId}_${env}_${ms}`, secure: true },
      (err, url) => {
        if (err) return reject(err);
        return resolve(url);
      }
    );
  });
};

export class ImageHandler {
  static async uploadImage(req, res) {
    const { secure_url } = await uploadToCloudinary(
      req.body.data.image,
      req.body.data.recipeId
    );

    res.send({ link: secure_url });
  }
}
