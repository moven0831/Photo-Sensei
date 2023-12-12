import Head from "next/head";
import { useEffect, useState } from "react";
import GradientBG from "../components/GradientBG.js";
import InputFile from "../components/InputFile.tsx";
import SelectOperation from "../components/SelectOperation.tsx";

export default function Home() {
    const [image, setImage] = useState<File | null>(null);
    const [operation, setOperation] = useState<string | null>("grayscale");
    useEffect(() => {
        // (async () => {
        //   const { Mina, PublicKey } = await import('o1js');
        //   const { Add } = await import('../../../contracts/build/src/');
        //   // Update this to use the address (public key) for your zkApp account.
        //   // To try it out, you can try this address for an example "Add" smart contract that we've deployed to
        //   // Berkeley Testnet B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA.
        //   const zkAppAddress = '';
        //   // This should be removed once the zkAppAddress is updated.
        //   if (!zkAppAddress) {
        //     console.error(
        //       'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA'
        //     );
        //   }
        //   //const zkApp = new Add(PublicKey.fromBase58(zkAppAddress))
        // })();
    }, []);

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
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(image, operation);
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
