import ZkappWorkerClient from "../services/zkappWorkerClient.ts";
import { PublicKey } from "o1js";
import { zkPixel, zkPixels } from "../types/zkPixel";
import { toast } from "react-toastify";

type sendImageArgs = {
    client: ZkappWorkerClient;
    publicKey: PublicKey;
    image: zkPixels;
    imageModified: zkPixels;
};

export const sendImage = async (args: sendImageArgs) => {
    if (!args.client) {
        toast.error("Client not initialized");
        return;
    }
    console.log("Current client", args.client);
    await args.client!.fetchAccount({
        publicKey: args.publicKey!,
    });
    await args.client!.createUpdateTransaction(args.image, args.imageModified);
    await args.client!.proveUpdateTransaction();
    const transactionJSON = await args.client!.getTransactionJSON();
    const { hash } = await (window as any).mina.sendTransaction({
        transaction: transactionJSON,
        feePayer: {
            fee: 1,
            memo: "",
        },
    });
    const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`;
    console.log(transactionLink);
};

export function handleImage(image: File): zkPixels {
    const croppedImage = [];
    for (let i = 0; i < 10; i++) {
        const row: zkPixel[] = [];
        for (let j = 0; j < 10; j++) {
            row.push(zkPixel.default());
        }
        croppedImage.push(row);
    }
    console.log(croppedImage);
    return { pixel: croppedImage };
}