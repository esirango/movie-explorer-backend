import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: "movie-explorer-avatars",
            allowed_formats: ["jpg", "jpeg", "png", "gif"],
            resource_type: "image",
        };
    },
});

const upload = multer({ storage });

export default upload;
