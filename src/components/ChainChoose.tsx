import { ClickAwayListener } from '@mui/material'
import { useEffect, useState } from 'react'
import { useConnect, useNetwork, useSwitchNetwork } from 'wagmi'

const ChainChoose = () => {
    const { chain } = useNetwork()
    const { connect, connectors } = useConnect()
    const { switchNetwork } = useSwitchNetwork()
    const [open, setOpen] = useState(false)
    const changeChain = (id: number) => {
        setOpen(false)
        switchNetwork?.(id)
    }
    useEffect(() => {
        connect({ connector: connectors[3] })
    }, [])
    return (
        <div className='relative'>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <button className='flex space-x-9 items-center border border-black1 px-[18px] h-[46px] rounded-[25px]' onClick={() => setOpen(!open)}>
                    <span className='text-[17px] leading-[28px] text-black3'>Current Chain</span>
                    <div className='flex items-center'>
                        <span className='font-medium leading-[28px] tracking-[2%] mr-2'>{(chain?.id === 56 || chain?.id === 43114) ? chain?.nativeCurrency.symbol : 'BNB'}</span>
                        {chain?.id === 56 && <img src='/images/chains/BNB.svg' />}
                        {chain?.id === 43114 && <img src='/images/chains/AVAX.svg' />}
                        {chain?.id !== 56 && chain?.id !== 43114 &&
                            <img src='/images/chains/BNB.svg' />
                        }
                        <svg className='ml-[15.17px]' xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'>
                            <path d='M1.16663 1.08337L4.99996 4.91671L8.83329 1.08337' stroke='#303030' />
                        </svg>
                    </div>
                </button>
            </ClickAwayListener>
            {open &&
                <div className='absolute top-[calc(100%+5px)] left-0 w-full'>
                    <div className='flex flex-col bg-white border border-black rounded-[25px]'>
                        <button className='flex justify-between items-center pl-[18px] pr-[44px] py-2 text-[17px] text-black2' onClick={() => changeChain(56)}>
                            <span>Binance Smart Chain</span>
                            <img src='/images/chains/BNB.svg' />
                        </button>
                        <button className='flex justify-between items-center pl-[18px] pr-[44px] py-2 text-[17px] text-black2' onClick={() => changeChain(43114)}>
                            <span>Avalanche Chain</span>
                            <img src='/images/chains/AVAX.svg' />
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChainChoose