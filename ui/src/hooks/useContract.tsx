import { PublicKey } from "o1js";
import { useEffect, useState } from "react";
import ZkappWorkerClient from "./zkappWorkerClient";

export default function useContract() {
    const [contract, setContract] = useState<any>(null); // contract instance

    useEffect(() => {
        (async () => {
            // const zkAppKey = zkAppAddress;
            const zkAppAddress = PublicKey.fromBase58("B62qinDpyhemL8P7MR4wrugqKYG9EC4s5PZZSkwGbBKsdoi3FopEdnk");
            // const zkAppKey = new PublicKey(zkAppAddress, "base58check");
            const { ImageTransform } = await import("../../../contracts/build/src");
            await ImageTransform.compile();
            const client = new ZkappWorkerClient();
            client.setActiveInstanceToBerkeley();
            const res = await client.fetchAccount({
                publicKey: zkAppAddress,
            });
            await client.loadContract();
            client.compileContract();
            const newContract = new ImageTransform(zkAppAddress);
            setContract(newContract);
        })();
    }, [setContract]);

    return contract;
}
