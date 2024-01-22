import jimp from "jimp";

// Function to convert an image to grayscale
const convertToGrayscale = async (imagePath: string) => {
    const image = await jimp.read(imagePath);
    image.grayscale();
    return image;
};

export default convertToGrayscale;
