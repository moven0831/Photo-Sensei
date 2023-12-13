import { PublicKey } from "o1js";
import { useEffect, useState } from "react";
import ZkappWorkerClient from "./zkappWorkerClient";

export default function useContract() {
    const [contract, setContract] = useState<any>(null); // contract instance
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const zkAppAddress = PublicKey.fromBase58("B62qinDpyhemL8P7MR4wrugqKYG9EC4s5PZZSkwGbBKsdoi3FopEdnk");
            const { ImageTransform } = await import("../../../contracts/build/src");
            const client = new ZkappWorkerClient();
            setIsLoading(true);
            await client.initZkappInstance(zkAppAddress);
            const currentNum = await client.getIsValid();
            console.log("client", currentNum);
            client.setActiveInstanceToBerkeley();
            const res = await client.fetchAccount({
                publicKey: zkAppAddress,
            });
            await client.loadContract();
            await client.compileContract();
            console.log("client", res);
            const newContract = new ImageTransform(zkAppAddress);
            setContract(newContract);
            setIsLoading(false);
        })();
    }, [setContract]);

    return {contract, isLoading};
}
