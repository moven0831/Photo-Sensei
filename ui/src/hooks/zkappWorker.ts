import { Field, Mina, PublicKey, fetchAccount, Struct, UInt32 } from "o1js";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { ImageTransform } from "../../../contracts/src/imageTransform.js";
import type { zkPixels } from "../types/zkPixel";

const state = {
    ImageTransform: null as null | typeof ImageTransform,
    zkapp: null as null | ImageTransform,
    transaction: null as null | Transaction,
};

// ---------------------------------------------------------------------------------------

const functions = {
    setActiveInstanceToBerkeley: async (args: {}) => {
        console.log("Creating Berkeley Instance");
        const Berkeley = Mina.Network("https://proxy.berkeley.minaexplorer.com/graphql");
        console.log("Berkeley Instance Created");
        Mina.setActiveInstance(Berkeley);
    },
    loadContract: async (args: {}) => {
        const { ImageTransform } = await import("../../../contracts/build/src/imageTransform.js");
        state.ImageTransform = ImageTransform;
    },
    compileContract: async (args: {}) => {
        await state.ImageTransform!.compile();
    },
    fetchAccount: async (args: { publicKey58: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        return await fetchAccount({ publicKey });
    },
    initZkappInstance: async (args: { publicKey58: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        state.zkapp = new state.ImageTransform!(publicKey);
    },
    getIsValid: async (args: {}) => {
        const isValid = state.zkapp!.isValid.get() ? 1 : 0;
        return isValid.toString();
    },
    createUpdateTransaction: async (args: { image: zkPixels; imageModified: zkPixels }) => {
        console.log("send Tx...");
        if (!state.zkapp) {
            throw new Error("zkapp not initialized");
        } else {
            console.log(state.zkapp.checkGrayscaleValid);
        }
        const transaction = await Mina.transaction(() => {
            const res = state.zkapp!.checkGrayscaleValid(args.image, args.imageModified);
            console.log(res);
        });
        state.transaction = transaction;
    },
    proveUpdateTransaction: async (args: {}) => {
        await state.transaction!.prove();
    },
    getTransactionJSON: async (args: {}) => {
        return state.transaction!.toJSON();
    },
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
    id: number;
    fn: WorkerFunctions;
    args: any;
};

export type ZkappWorkerReponse = {
    id: number;
    data: any;
};

if (typeof window !== "undefined") {
    addEventListener("message", async (event: MessageEvent<ZkappWorkerRequest>) => {
        const returnData = await functions[event.data.fn](event.data.args);

        const message: ZkappWorkerReponse = {
            id: event.data.id,
            data: returnData,
        };
        postMessage(message);
    });
}

console.log("Web Worker Successfully Initialized.");
