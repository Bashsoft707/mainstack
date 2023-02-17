import multer from "multer";

export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (_req, file, callback) => {
    if (
      !file.originalname.match(/\.(jpg|jpeg|png|gif|mp3|pdf|mp4|webp|svg)$/i)
    ) {
      return callback(new Error("Error"));
    }
    callback(null, true);
  },
});
