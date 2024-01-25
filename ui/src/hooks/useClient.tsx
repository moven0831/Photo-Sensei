import { PublicKey } from "o1js";
import { useEffect, useState } from "react";
import ZkappWorkerClient from "../services/zkappWorkerClient";

export default function useClient() {
    const [client, setClient] = useState<ZkappWorkerClient | null>(null); // client instance
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
    useEffect(() => {
        const loadClient = async () => {
            setIsLoading(true);
            const client = new ZkappWorkerClient();
            await client.setActiveInstanceToBerkeley();

            const mina = (window as any).mina;
            let cnt = 1;
            const publicKeyBase58: string = (await mina.requestAccounts())[0];
            const publicKey = PublicKey.fromBase58(publicKeyBase58);
            setPublicKey(publicKey);
            console.log(`Using key:${publicKey.toBase58()}`);

            // Keep fetching the account until it exists
            const fetchAccountWithTimeout = async () => {
                const timeout = 5000; // Set your timeout duration here
                const timer = setTimeout(() => {
                    console.log('Timeout, fetching account again');
                    fetchAccountWithTimeout();
                }, timeout);
    
                try {
                    const res = await client.fetchAccount({
                        publicKey: publicKey,
                    });
                    clearTimeout(timer);
                } catch (error) {
                    console.log('Error fetching account:', error);
                }
            };
    
            await fetchAccountWithTimeout();

            console.log("account fetched, public key: ", publicKey);
            console.log("loading contract");
            await client.loadContract();
            console.log("successfully loading contract");
            console.log("compiling contract");
            await client.compileContract();
            console.log("successfully compiling contract");

            const ZKAPP_ADDRESS = "B62qinDpyhemL8P7MR4wrugqKYG9EC4s5PZZSkwGbBKsdoi3FopEdnk";
            const zkappPublicKey = PublicKey.fromBase58(ZKAPP_ADDRESS);
            await client.initZkappInstance(zkappPublicKey);
            await client.fetchAccount({ publicKey: zkappPublicKey });
            const currentStatus = await client.getIsValid();
            console.log(`Current state in zkApp: ${currentStatus.toString()}`);

            setClient(client);
            console.log("client", client);
            setIsLoading(false);
            console.log("succefully connect to client", client);
        };
        loadClient();
    }, [setClient, setPublicKey, setIsLoading]);

    return { client, isLoading, publicKey };
}
