import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads/patients',

    filename: (req, file, callback) => {
      const uniqueName =
        `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;

      callback(null, uniqueName);
    },
  }),

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new Error('Only PDF, JPG, JPEG and PNG files are allowed.'),
        false,
      );
    }
  },
};