import { Struct, UInt32 } from "o1js";

export class zkPixel extends Struct({
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
export interface zkPixels {
    pixel: zkPixel[][];
}