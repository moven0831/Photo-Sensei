"use client";
import Head from "next/head";
import GradientBG from "../components/GradientBG.js";
import InputFile from "../components/InputFile.tsx";
import SelectOperation from "../components/SelectOperation.tsx";
import useMinaWallet from "../hooks/useMinaWallet.tsx";
import useContract from "../hooks/useClient.tsx";
import ZkappWorkerClient from "../hooks/zkappWorkerClient";
import { useState } from "react";
import { PublicKey } from "o1js";
import { zkPixel, zkPixels } from "../types/zkPixel"


const sendImage = async (
    client: ZkappWorkerClient,
    publicKey: PublicKey,
    image: zkPixels,
    imageModified: zkPixels
) => {
    if (!client) {
        window.alert("Contract not loaded");
        return;
    }
    console.log("Current client", client);
    await client!.fetchAccount({
        publicKey: publicKey!,
    });
    await client!.createUpdateTransaction(
        image,
        imageModified
    );
    await client!.proveUpdateTransaction();
    const transactionJSON = await client!.getTransactionJSON();
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

function handleImage(image: File): zkPixels {
    const croppedImage = [];
    for (let i = 0; i < 10; i++) {
        const row: zkPixel[] = [];
        for (let j = 0; j < 10; j++) {
            row.push(zkPixel.default());
        }
        croppedImage.push(row);
    }
    return { pixel: croppedImage };
}

export default function Home() {
    useMinaWallet();
    const { client, isLoading, publicKey } = useContract();
    const [image, setImage] = useState<File | null>(null);
    const [operation, setOperation] = useState<string>("grayscale");

    return (
        <>
            <Head>
                <title>Photo Sensei</title>
                <meta name="description" content="built with o1js" />
                <link rel="icon" href="/assets/favicon.ico" />
            </Head>
            <GradientBG>
                <form
                    className="flex flex-col m-auto w-fit mt-10"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const img = handleImage(image!);
                        if (!publicKey || !client) {
                            window.alert("Wallet not connected");
                            return;
                        }
                        sendImage(client, publicKey, img, img);
                    }}
                >
                    <div className="m-auto font-bold text-3xl font-mono text-gray-700">
                        Photo Sensei
                    </div>
                    <InputFile image={image} setImage={setImage}></InputFile>
                    <SelectOperation
                        operation={operation}
                        setOperation={setOperation}
                    ></SelectOperation>
                    <button className="bg-white w-fit mt-10 m-auto text-gray-600 border-2 border-gray-300 font-medium rounded-lg text-sm py-1 px-5 text-center hover:bg-slate-50">
                        Submit
                    </button>
                    {isLoading && (
                        <div className="m-auto mt-10 text-end font-bold text-sm font-mono text-gray-700">
                            Loading Contract...
                        </div>
                    )}
                </form>
            </GradientBG>
        </>
    );
}
