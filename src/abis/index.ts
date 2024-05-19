import { Address } from 'viem'

interface ChainInfo {
    STAKING: Address
    YAY: Address
    EXPLORER: string
    EXCHANGE: string
}

interface Info {
    [key: number]: ChainInfo
}

export const info: Info = {
    56: {
        STAKING: '0x7bDB6C21455b56F803a190fF7F58E9105c71C37e',
        YAY: '0x524df384bffb18c0c8f3f43d012011f8f9795579',
        EXPLORER: 'bscscan.com',
        EXCHANGE: 'https://pancakeswap.finance/swap?outputCurrency=0x524dF384BFFB18C0C8f3f43d012011F8F9795579&inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D563',
    },
    43113: {
        STAKING: '0x20Af0d72Fe1A4Aa032C4634324aE7Cf4CF4a59FE',
        YAY: '0x9cc5724B1A0008bF2bfe9E7Da64E844156667ccd',
        EXPLORER: 'testnet.snowtrace.io',
        EXCHANGE: 'https://app.pangolin.exchange/#/swap?outputCurrency=0x01C2086faCFD7aA38f69A6Bd8C91BEF3BB5adFCa',
    },
    43114: {
        STAKING: '0xa433fdc7fa61836f2f4f6c049c9bb261a1619fc7',
        YAY: '0x01c2086facfd7aa38f69a6bd8c91bef3bb5adfca',
        EXPLORER: 'snowtrace.io',
        EXCHANGE: 'https://app.pangolin.exchange/#/swap?outputCurrency=0x01C2086faCFD7aA38f69A6Bd8C91BEF3BB5adFCa',
    },
}

export const blank = '0x0000000000000000000000000000000000000000'