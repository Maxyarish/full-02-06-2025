const path = require("path");
const multer = require("multer");
const CONSTANTS = require("../constants");
const storage = multer.diskStorage({
  destination: CONSTANTS.UPLOAD_FOLDER,
  filename: (req, res, cb) => {
    cb(null, Date().now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname.toLowerCase());
  if (CONSTANTS.UPLOAD_IMG_TYPES.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error("only format" + CONSTANTS.UPLOAD_IMG_TYPES.toString()));
  }
};

const upload = multer({
  storage,
  limits: { filies: CONSTANTS.MAX_LIMIT_IMG },
  fileFilter,
});

module.exports = upload;
