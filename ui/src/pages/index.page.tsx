"use client";
import Head from "next/head";
import Img from "next/image";
import GradientBG from "../components/GradientBG.js";
import InputFile from "../components/InputFile.tsx";
import SelectOperation from "../components/SelectOperation.tsx";
import useMinaWallet from "../hooks/useMinaWallet.tsx";
import useContract from "../hooks/useClient.tsx";
import ImageContainer from "../components/ImageContainer.tsx";
import { useState } from "react";
import { handleImage, sendImage } from "@/services/imageServices.ts";

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
                <div className="flex flex-row m-auto w-4/5">
                    <form
                        className="flex flex-col m-16 w-fit mt-40"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const img = handleImage(image!);
                            if (!publicKey || !client) {
                                window.alert("Wallet not connected");
                                return;
                            }
                            // temporary using same image for image and imageModified
                            sendImage({ client, publicKey, image: img, imageModified: img });
                        }}
                    >
                        <div className="m-auto font-bold text-3xl font-mono text-gray-700">Photo Sensei</div>
                        <InputFile image={image} setImage={setImage}></InputFile>
                        <SelectOperation operation={operation} setOperation={setOperation}></SelectOperation>
                        <button className="bg-white w-fit mt-10 m-auto text-gray-600 border-2 border-gray-300 font-medium rounded-lg text-sm py-1 px-5 text-center hover:bg-slate-50">
                            Submit
                        </button>
                        {isLoading && (
                            <div className="m-auto mt-10 text-end font-bold text-sm font-mono text-gray-700">
                                Loading Contract...
                            </div>
                        )}
                    </form>
                    {/* photo preview */}
                    <ImageContainer title="Image Preview">
                        {image && (
                            <Img
                                src={URL.createObjectURL(image)}
                                alt="Please select an image"
                                width={0}
                                height={0}
                                style={{ width: "100%", height: "auto" }}
                            />
                        )}
                    </ImageContainer>
                </div>
            </GradientBG>
        </>
    );
}
