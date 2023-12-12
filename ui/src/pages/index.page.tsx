import Head from "next/head";
import { useEffect, useState } from "react";
import GradientBG from "../components/GradientBG.js";
import InputFile from "../components/InputFile.tsx";
import SelectOperation from "../components/SelectOperation.tsx";


async function handleSubmit() {
    const { Mina, PublicKey } = await import('o1js');
    const { ImageTransform } = await import('../../../contracts/build/src/');
    // await ImageTransform.compile();
    try {
      const zkAppAddress = 'B62qnxE3BZK3ZTzZoxoZZMFvFsyJduYESeyd5g9wnYNk4gBzft4KkNk';
      const tx = await Mina.transaction(() => {
        const imageTranformInstance = new ImageTransform(PublicKey.fromBase58(zkAppAddress));
        // await imageTranformInstance.compile();
        imageTranformInstance.deploy();
        imageTranformInstance.update();
        // imageTranformInstance.grayscale();
      });
  
      await tx.prove();
  
      const { hash } = await window.mina.sendTransaction({
        transaction: tx.toJSON(),
        feePayer: {
          fee: '',
          memo: 'zk',
        },
      });
  
      console.log(hash);
    } catch (err) {
      console.log(err.message);
    }
}


export default function Home() {
    const [image, setImage] = useState<File | null>(null);
    const [operation, setOperation] = useState<string | null>("grayscale");
    useEffect(() => {
        (async () => {
          const { Mina, PublicKey } = await import('o1js');
          const { ImageTransform } = await import('../../../contracts/build/src/');
          // Update this to use the address (public key) for your zkApp account.
          // To try it out, you can try this address for an example "Add" smart contract that we've deployed to
          // Berkeley Testnet B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA.
          const zkAppAddress = 'B62qnxE3BZK3ZTzZoxoZZMFvFsyJduYESeyd5g9wnYNk4gBzft4KkNk';
          // This should be removed once the zkAppAddress is updated.
          if (!zkAppAddress) {
            console.error(
              'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA'
            );
          }

          let accounts;
          
          try {
              // Accounts is an array of string Mina addresses.
              accounts = await window.mina.requestAccounts();

              // Show first 6 and last 4 characters of user's Mina account.
              const display = `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
            } catch (err) {
              // If the user has a wallet installed but has not created an account, an
              // exception will be thrown. Consider showing "not connected" in your UI.
              console.log(err.message);
           }
        })();
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
                    onSubmit={async (e) => {
                        e.preventDefault();
                        console.log(image, operation);
                        handleSubmit();
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
