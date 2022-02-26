export type TheHood = {
    "version": "0.1.0",
    "name": "the_hood",
    "instructions": [
        {
            "name": "train",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "trainingRecord",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "thugAccount",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "unTrain",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "trainingRecord",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "thugAccount",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "trainingRecord",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "thugOwnerPk",
                        "type": "publicKey"
                    },
                    {
                        "name": "trainingStart",
                        "type": "i64"
                    }
                ]
            }
        }
    ]
};

export const IDL: TheHood = {
    "version": "0.1.0",
    "name": "the_hood",
    "instructions": [
        {
            "name": "train",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "trainingRecord",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "thugAccount",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "unTrain",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "trainingRecord",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "thugAccount",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "trainingRecord",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "thugOwnerPk",
                        "type": "publicKey"
                    },
                    {
                        "name": "trainingStart",
                        "type": "i64"
                    }
                ]
            }
        }
    ]
};
