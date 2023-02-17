import multer from "multer"
import { IResponseStatusCodes } from "../interfaces/response.interface";
import { ApiError } from "./api-error.utils";

// export const upload = multer({
//   limits: {
//     fileSize: 2000000,
//   },
//   fileFilter(_req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
//       return cb(
//         new ApiError({
//           message: "Invalid file format, Please upload an Image",
//           statusCode: IResponseStatusCodes.BAD_REQUEST,
//         })
//       );
//     }
//     cb(null, true);
//   },
// });



export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, callback) => {
    if (
      !file.originalname.match(/\.(jpg|jpeg|png|gif|mp3|pdf|mp4|webp|svg)$/i)
    ) {
      return callback(null, false);
    }
    callback(null, true);
  },
});