import React from 'react';
import {
    useConnection,
    useWallet,
} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import {PublicKey} from "@solana/web3.js";
import {Program, Provider, web3} from '@project-serum/anchor';
import {PROGRAM_ID, SEED} from "./constants";
import * as anchor from '@project-serum/anchor';
import {TheHood} from "./IDL";
import {Button} from "@solana/wallet-adapter-react-ui/lib/Button";
import {associatedAddress} from "@project-serum/anchor/dist/cjs/utils/token";

/// To check for thug wallets,
/// Check all token accounts owned by the user with balance > 0
/// Compare mint keys with thug mint keys -> thug account
/// Use that mint key to drive the training record, if exits -> thug is training (check thug_owner_pk to see if thug moved)
/// Use `train` to start training if not training yet
/// User `untrain` to start training if already training

const MyWallet: React.FC = () => {
    const { connection } = useConnection();
    let walletAddress = "";

    const program = anchor.workspace.TheHood as Program<TheHood>;

    // if you use anchor, use the anchor hook instead
    // const wallet = useAnchorWallet();
    // const walletAddress = wallet?.publicKey.toString();

    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }


    const [mintKeyString, setMintKeyString] = React.useState("");
    const [trainingRecord, setTrainingRecord] = React.useState({});

    React.useEffect(() => {
        (async () => {
            try {
                const mintKey = new PublicKey(mintKeyString);
                const [ trainingRecordAddress, bump ] = await web3.PublicKey.findProgramAddress(
                    [
                        Buffer.from(SEED),
                        mintKey.toBytes()
                    ],
                    new PublicKey(PROGRAM_ID),
                )

                let trainingRecord = await program.account.trainingRecord.fetch(trainingRecordAddress)
                setTrainingRecord(trainingRecord);
            } catch (e) {

            }
        })()
    }, [ mintKeyString ])

    const train = async () => {
        const mintKey = new PublicKey(mintKeyString);
        const [ trainingRecordAddress, bump ] = await web3.PublicKey.findProgramAddress(
            [
                Buffer.from(SEED),
                mintKey.toBytes()
            ],
            new PublicKey(PROGRAM_ID),
        )

        let ata = await associatedAddress({ mint: mintKey, owner: wallet.publicKey! })

        let tx = program.transaction.train({
            accounts: {
                signer: wallet.publicKey!,
                trainingRecord: trainingRecordAddress,
                thugAccount: ata,
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                systemProgram: anchor.web3.SystemProgram.programId,
            }
        })

        await wallet.signTransaction!(tx)
    }

    const untrain = async () => {
        const mintKey = new PublicKey(mintKeyString);
        const [ trainingRecordAddress, bump ] = await web3.PublicKey.findProgramAddress(
            [
                Buffer.from(SEED),
                mintKey.toBytes()
            ],
            new PublicKey(PROGRAM_ID),
        )

        let ata = await associatedAddress({ mint: mintKey, owner: wallet.publicKey! })

        let tx = program.transaction.unTrain({
            accounts: {
                signer: wallet.publicKey!,
                trainingRecord: trainingRecordAddress,
                thugAccount: ata,
                systemProgram: anchor.web3.SystemProgram.programId,
            }
        })

        await wallet.signTransaction!(tx)
    }

    return (
        <>
            {wallet.connected &&
                <p>Your wallet is {walletAddress}</p> ||
                <p>Hello! Click the button to connect</p>
            }

            <h3>Mint Key</h3>
            <input onChange={(v) => setMintKeyString(v.target.value)}/>

            <Button onClick={train}>Train</Button>
            <Button onClick={untrain}>Untrain</Button>

            <div className="multi-wrapper">
                <span className="button-wrapper">
                    <WalletModalProvider>
                        <WalletMultiButton />
                    </WalletModalProvider>
                </span>
                {wallet.connected && <WalletDisconnectButton />}
            </div>
        </>
    );
};

export default MyWallet;
