import {
  SmartContract,
  state,
  State,
  method,
  Struct,
  UInt32,
  Provable,
  Bool,
} from 'o1js';
import { Pixel} from './pixel.js';

class zkPixel extends Struct({
  r: UInt32,
  g: UInt32,
  b: UInt32,
}) {
  static default() {
    return new zkPixel({
      r: UInt32.from(0),
      g: UInt32.from(0),
      b: UInt32.from(0),
    });
  }
}

// assume that the image is 100x100
class Image extends Struct({
  pixel: Provable.Array(Provable.Array(zkPixel, 10), 10),
}) {
  static from(value: Pixel[][]) {
    // map the Pixel[][] to a zkPixel[][]
    const zkPixels = value.map((row) =>
      row.map((pixel) => {
        return {
          r: UInt32.from(pixel.r),
          g: UInt32.from(pixel.g),
          b: UInt32.from(pixel.b),
        };
      })
    );
    return new Image({ pixel: zkPixels });
  }

  static equals(a: Image, b: Image) {
    // compare the pixels in the images size of 100x100
    for (let i = 0; i < a.pixel.length; i++) {
      for (let j = 0; j < a.pixel[i].length; j++) {
        if (
          !a.pixel[i][j].r.equals(b.pixel[i][j].r) ||
          !a.pixel[i][j].g.equals(b.pixel[i][j].g) ||
          !a.pixel[i][j].b.equals(b.pixel[i][j].b)
        ) {
          return false;
        }
      }
    }
    return true;
  }
}

export class ImageTransform extends SmartContract {
  @state(Bool) isValid = State<Bool>();

  @method init() {
    // initialize the redacted image to be all 0s
    this.isValid.set(Bool(false));
    super.init();
  }

  @method update() {
    this.isValid.set(Bool(false));
  }

  @method checkGrayscaleValid(
    originalImageInstance: Image,
    redactedImageInstance: Image
  ) {
    // apply the ops to the original image
    const originalImage = originalImageInstance;
    const redactedImage = redactedImageInstance;
    for (let i = 0; i < originalImage.pixel.length; i++) {
      for (let j = 0; j < originalImage.pixel[i].length; j++) {
        const gray = originalImage.pixel[i][j].r
          .mul(UInt32.from(30))
          .add(originalImage.pixel[i][j].g.mul(UInt32.from(59)))
          .add(originalImage.pixel[i][j].b.mul(UInt32.from(11)));
        gray.equals(redactedImage.pixel[i][j].r.mul(UInt32.from(100)));
      }
    }
    this.isValid.set(Bool(true));
  }
}
