"use client";
import Head from "next/head";
import GradientBG from "../components/GradientBG.js";
import InputFile from "../components/InputFile.tsx";
import SelectOperation from "../components/SelectOperation.tsx";
import useMinaWallet from "../hooks/useMinaWallet.tsx";
import useContract from "../hooks/useContract.tsx";
import { useState } from "react";
import { Mina } from "o1js";
// const sendImage = async (image: File, operation: string, contract: any) => {
//     const tx = await Mina.transaction(() => {
//         // TODO: implement this
//     });
//     await tx.prove();
//     const { hash } = await window.mina.sendTransaction({
//         transaction: tx.toJSON(),
//         feePayer: {
//             fee: "0.1",
//             memo: "zk",
//         },
//     });
//     console.log(hash);
// };
// const handleImage = (image: File) => {
//     // TODO: image processing
//     return image;
// };

async function prove(image: File) {
    // imageServices.crop(image, "", 100, 100);
    fetch("http://localhost:3001/crop", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: image,
    })
        .then((res) => res.json())
        .then((res) => console.log(res));
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
                        console.log(image, operation);
                        await prove(image!);
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
