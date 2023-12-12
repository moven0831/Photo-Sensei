import { Field, SmartContract, state, State, method, Struct, UInt32, Provable, Bool } from 'o1js';
import { Pixel, Ops } from './pixel';

class zkPixel extends Struct({
  r: UInt32,
  g: UInt32,
  b: UInt32
}){}


// assume that the image is 100x100
class Image extends Struct({
  pixel: Provable.Array(Provable.Array(zkPixel, 100), 100),
}) {
  static from(value: Pixel[][]) {
    // map the Pixel[][] to a zkPixel[][]
    const zkPixels = value.map(row => row.map(pixel => {
      return {
        r: UInt32.from(pixel.r),
        g: UInt32.from(pixel.g),
        b: UInt32.from(pixel.b)
      }
    }));
    return new Image({ pixel: zkPixels });
  }

  static equals(a: Image, b: Image) {
    // compare the pixels in the images size of 100x100
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        if (!a.pixel[i][j].r.equals(b.pixel[i][j].r) ||
            !a.pixel[i][j].g.equals(b.pixel[i][j].g) ||
            !a.pixel[i][j].b.equals(b.pixel[i][j].b)) {
          return false;
        }
      }
    }
    return true;
  }
}

  
export class ImageTransform extends SmartContract {
  @state(Image) redactedImage = State<Image>();
  @state(Bool) isValid = State<Bool>();

  @method init() {
    super.init();
  }


  @method update(redactedImageInstance: Image, ops: Ops[]) {
    this.redactedImage.set(redactedImageInstance);
    this.isValid.set(Bool(false));
  }
  
  @method checkOpsValid(originalImageInstance: Image, ops: Ops[]) {
    let redactedImage = this.redactedImage.get();
    
    // apply the ops to the original image
    let originalImage = originalImageInstance;
    for (const op of ops) {
      if (op === Ops.GRAYSCALE) {
        for (let i = 0; i < 100; i++) {
          for (let j = 0; j < 100; j++) {
            const gray = originalImage.pixel[i][j].r.mul(UInt32.from(30))
              .add(originalImage.pixel[i][j].g.mul(UInt32.from(59)))
              .add(originalImage.pixel[i][j].b.mul(UInt32.from(11)));

            gray.equals(redactedImage.pixel[i][j].r.mul(UInt32.from(100)));
          }
        }
      }
      else if (op === Ops.CROP) {
        // TODO
      }
      else if (op === Ops.RESIZE) {
        // TODO
      }
      // TODO: implement the other ops
    }

    // compare the redacted image to the original image
    if (Image.equals(redactedImage, originalImage)) {
      this.isValid.set(Bool(true));
    }
  }
}
