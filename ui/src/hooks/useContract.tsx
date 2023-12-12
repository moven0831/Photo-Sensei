import { PublicKey } from "o1js";
import { useEffect, useState } from "react";

export default function useContract() {
    const [contract, setContract] = useState<any>(null); // contract instance
    const zkAppAddress = "B62qnxE3BZK3ZTzZoxoZZMFvFsyJduYESeyd5g9wnYNk4gBzft4KkNk";

    useEffect(() => {
        (async () => {
            const zkAppKey = zkAppAddress as unknown as PublicKey;
            const { ImageTransform } = await import("../../../contracts/build/src/");
            const newContract = new ImageTransform(zkAppKey);
            setContract(newContract);
        })();
    }, [setContract]);

    return contract;
}
