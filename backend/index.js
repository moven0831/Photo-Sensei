// server.js
const express = require("express");
const multer = require("multer");
const sharp = require('sharp');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Endpoint for cropping an image
app.post('/crop', upload.single('image'), async (req, res) => {
    const imageOp = new ImageOperation();
    const { image, crop } = req.body;

    // Save the image type is FILE into a jpg file in the temp folder
    // convert image the request into a jpg file
    const imagePath = `temp/${req.file.filename}.jpg`;
    await imageOp.convert(image, imagePath);
    
    // crop the image
    const outputPath = `output/${req.file.filename}-cropped.jpg`;
    
    try {
        await imageOp.crop(imagePath, outputPath, 10, 10);
        const croppedImage = sharp(outputPath);
        // convert cropped image to UNIT8ARRAY
        const { data, info } = await croppedImage
            .raw()
            .toBuffer({ resolveWithObject: true });
        
        // sent the data back to the frontend
        res.status(200).send({ message: 'Image cropped successfully', info: data});
    } catch (error) {
        res.status(500).send({ message: 'Error processing image', error });
    }
});

// ... other routes or middleware

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
