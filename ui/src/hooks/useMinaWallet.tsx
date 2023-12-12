import { useEffect } from "react";
export default function useMinaWallet() {
    useEffect(() => {
        try {
            (async () => {
                let accounts = await window!.mina.requestAccounts();
                console.log(accounts);
            })();
        } catch (err) {
            window.alert("Please install the Mina browser extension");
        }
    }, []);
}
