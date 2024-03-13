import fs from "fs"

export const imgMiddleware = async(req, res, next) => {
    try {
        if(!req.files) {
            res.status(400).json({mesage: "No files were choosen."})
        }
        let files = Object.values(req.files).flat()
        for (const file of files) {
            if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" && file.mimetype !== "image/webp") {
                removeTmp(file.tempFilePath)
                res.status(400).json({mesage: "File format is incorrect, Only JPEG, PNG, WEBP is supported"})
            }

            if(file.size > 1024*1024*10) {
                removeTmp(file.tempFilePath)
                res.status(400).json({mesage: "File size is too large, max size is 10MB"})
            }
        }
        next()
    } catch (error) {
        res.status(500).json({mesage: error.message})
    }
}

const removeTmp = (path) => {
    fs.unlink(path, (error) => {
        if (err) throw err
    })
}