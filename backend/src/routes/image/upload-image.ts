import { Request, Response, Router } from "express";

import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user";
import upload from "../../utils/upload";
import { cloudinary } from "../../config/cloudinary";
import { BadRequestError } from "../../errors/bad-request-error";

const router = Router();

router.post(
  '/api/image/upload',
 
  requireAuth,
  currentUser,
  upload.single('image'), 
  async (req: Request, res: Response) => {
    try {
   
      if (!req.file?.buffer) {
        throw new BadRequestError('Image not uploaded');
      }

      const buffer = req.file.buffer;

      
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'foo' }, 
        (error:any, result) => {
          if (error) {
            return res.status(500).json({ error: 'Failed to upload image', details: error.message });
          }

    
          res.status(200).json({
            message: 'Image uploaded successfully',
            url: result?.secure_url, 
            public_id: result?.public_id, 
          });
        }
      );

      stream.end(buffer);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
);

export { router as uploadImageRouter };
