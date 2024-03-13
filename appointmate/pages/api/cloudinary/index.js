import { createRouter } from "next-connect"
import cloudinary from "cloudinary"
import fs from "fs"
import fileUpload from "express-fileupload"
import { imgMiddleware } from "@/middleware/imageMiddleware"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const router = createRouter().use(
    fileUpload({
        useTempFiles: true,
    })
).use(imgMiddleware)

router.post(async (req, res) => {
    try {
        const {path} = req.body
        let files = Object.values(req.files).flat()
        let images = []
        for (const file of files) {
            const img = await uploadToCloudinaryHandler(file, path)
            images.push(img)
            removeTmp(file.tempFilePath)
        }
        res.json(images)

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.delete(async (req, res) => {
    try {
      let public_ids = req.body.public_ids;
  
      if (!public_ids || !Array.isArray(public_ids) || public_ids.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid or missing public_ids for deletion." });
      }
      // Use the Cloudinary API to delete the images
      const deletionResults = await Promise.all(public_ids.map(public_id => {
        return new Promise((resolve) => {
          cloudinary.v2.uploader.destroy(public_id, (err, result) => {
            if (err) {
              resolve({ public_id, success: false, error: err });
            } else {
              resolve({ public_id, success: true, result });
            }
          });
        });
      }));
  
      res.json({ success: true, deletionResults });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });  

const uploadToCloudinaryHandler = async (file, path) => {
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: path,
        }, (err, res) => {
            if (err) {
                removeTmp(file.tempFilePath)
                console.log(err)
                return res.status(400).json({message: "Upload image failed!"})
            }
            resolve({
                url: res.secure_url,
                public_url: res.public_id,
            })
        })
    })
}

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    }
}

export default router.handler()
