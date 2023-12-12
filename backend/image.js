import sharp from 'sharp';

class ImageOperation {
  constructor() {
    console.log('ImageOperation constructor');
  }
  async getMetadata(inputPath) {
    const metadata = await sharp(inputPath).metadata();
    return metadata;
  }

  async grayScale(inputPath, outputPath) {
    const image = sharp(inputPath);
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });
    // use data to compute grayscale
    for (let i = 0; i < data.length; i += info.channels) {
      // If there's an alpha channel, skip it
      const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
      },
    })
      .jpeg()
      .toFile(outputPath);
  }
  async grayScaleHundred(inputPath) {
    const image = sharp(inputPath);
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });
    // use data to compute grayscale
    for (let i = 0; i < data.length; i += info.channels) {
      // If there's an alpha channel, skip it
      const gray = data[i] * 30 + data[i + 1] * 59 + data[i + 2] * 11;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
    return data;
  }
  async crop(inputPath, outputPath) {
    // crop and only remains the left upper corner: 100 x 100
    await sharp(inputPath)
      .extract({ left: 0, top: 0, width: 100, height: 100 })
      .toFile(outputPath);
  }
}

const image = new ImageOperation();
image.crop('./src/assets/big.jpg', './src/assets/big-gray.jpg');
