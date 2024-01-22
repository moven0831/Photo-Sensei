import { Field, Mina, PrivateKey, PublicKey, AccountUpdate } from 'o1js';

import imageProcessing from './service/image/imageProcessing';
// import { ImageTransform } from './imageTransform';
import { Pixel } from './pixel';

import { assertInteger } from 'o1js/dist/node/bindings/crypto/non-negative';
const { jimp } = require('jimp');

describe('ImageTransform', () => {
    // TODO: get the orginal image from /assets
    it('should read an image', async () => {
        assertInteger(1, "werwerwrew");
    });
    // read the image
    // let originalImage;
    it("wewer", async () => {
        const originalImagePath = './assets/tiny.jpg';
        let originalImage = await jimp.read(originalImagePath);
        expect(originalImagePath).toBeDefined();
    });

    // convert the image to grayscale
    // let grayscaleImage;
    // beforeAll(async () => {
    //     grayscaleImage = await imageProcessing.convertToGrayscale(originalImagePath);
    // });

    // print the rgb values of the original image
    // afterAll(() => {
    //     // iterate over the pixels in the image
    //     for (let x = 0; x < originalImage.bitmap.width; x++) {
    //         for (let y = 0; y < originalImage.bitmap.height; y++) {
    //             // get the rgb values of the pixel
    //             const idx = originalImage.getPixelIndex(x, y);
    //             const red = originalImage.bitmap.data[idx + 0];
    //             const green = originalImage.bitmap.data[idx + 1];
    //             const blue = originalImage.bitmap.data[idx + 2];
    //             console.log(`x: ${x}, y: ${y}, red: ${red}, green: ${green}, blue: ${blue}`);
    //         }
    //     }
    // });

    // const imageTransform = new ImageTransform();

    // it('should transform an image', async () => {
    //     const image = await imageTransform.transform();
    //     expect(image).toBeDefined();
    // });
});