"use client";
import Head from "next/head";
import GradientBG from "../components/GradientBG.js";
import InputFile from "../components/InputFile.tsx";
import SelectOperation from "../components/SelectOperation.tsx";
import useMinaWallet from "../hooks/useMinaWallet.tsx";
import useContract from "../hooks/useContract.tsx";
import { useState } from "react";
import { Mina } from "o1js";
import { Struct, UInt32 } from "o1js";

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
interface zkPixels {
    pixel: zkPixel[][];
}
const sendImage = async (contract: any, image: zkPixels, imageModified: zkPixels) => {
    console.log(Mina);
    const tx = await Mina.transaction(() => {
        contract.checkGrayscaleValid(image, imageModified);
    });
    await tx.prove();
    const { hash } = await window.mina.sendTransaction({
        transaction: tx.toJSON(),
        feePayer: {
            fee: "0.1",
            memo: "zk",
        },
    });
    console.log(hash);
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
    const [image, setImage] = useState<File | null>(null);
    const [operation, setOperation] = useState<string>("grayscale");
    const contract = useContract();

    return (
        <>
            <Head>
                <title>Mina zkApp UI</title>
                <meta name="description" content="built with o1js" />
                <link rel="icon" href="/assets/favicon.ico" />
            </Head>
            <GradientBG>
                <form
                    className="flex flex-col m-auto w-fit mt-10"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const img = handleImage(image!);
                        sendImage(contract, img, img);
                    }}
                >
                    <div className="m-auto font-bold text-3xl font-mono text-gray-700">Photo Sensei</div>
                    <InputFile image={image} setImage={setImage}></InputFile>
                    <SelectOperation operation={operation} setOperation={setOperation}></SelectOperation>
                    <button className="bg-white w-fit mt-10 m-auto text-gray-600 border-2 border-gray-300 font-medium rounded-lg text-sm py-1 px-5 text-center hover:bg-slate-50">
                        Submit
                    </button>
                </form>
            </GradientBG>
        </>
    );
}
