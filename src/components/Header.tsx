import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNetwork } from 'wagmi'

import ConnectWallet from './ConnectWallet'
import { info } from '../abis'

const Header = () => {
    const { chain } = useNetwork()
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <header className='bg-white text-[14px] leading-[16.71px] tracking-[4.5%] uppercase font-medium relative'>
            <div className=''>
                <div className='flex justify-between items-center h-[107px] relative px-5 xl:px-[100px] relative'>
                    <div className='flex justify-between items-center h-16'>
                        <a href='https://yay.network/' target='_blank'>
                            <img className='h-[30.54px]' src='/images/logo_header.svg' />
                        </a>
                    </div>
                    <div className='hidden lg:flex space-x-[42px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black2 tracking-[0.63px]'>
                        <a href='https://invest.yay.network/' target='_blank'>Investor portal</a>
                        <Link to='/'>staking</Link>
                        <Link to='/'>ranking<span className='text-black3'> soon</span></Link>
                    </div>
                    <div className='flex items-center'>
                        <a href={chain?.id ? info[chain?.id]?.EXCHANGE : ''} target={chain?.id === 56 || chain?.id === 43114 ? '_blank' : ''} className='hidden sm:flex justify-center items-center px-11 h-12 bg-black1 rounded-[31px] text-white tracking-[0.675px]'>
                            buy yay
                        </a>
                        <div className='hidden sm:block ml-2'>
                            <ConnectWallet />
                        </div>
                        <img className='flex lg:hidden ml-5' src='/images/ham.svg' onClick={() => setOpenMenu(!openMenu)} />
                    </div>
                </div>
            </div>
            {openMenu &&
                <div className="flex lg:hidden flex-col space-y-5 p-5 absolute top-full right-0 w-full bg-white rounded-sm z-[2] shadow-xl">
                    <div className='flex lg:hidden flex-col items-center space-y-8 text-black2 tracking-[0.63px]'>
                        <a href='https://invest.yay.network/' target='_blank'>Investor portal</a>
                        <Link to='/'>staking</Link>
                        <Link to='/'>ranking<span className='text-black3'> soon</span></Link>
                    </div>
                    <a href={chain?.id ? info[chain?.id]?.EXCHANGE : ''} target={chain?.id === 56 || chain?.id === 43114 ? '_blank' : ''} className='flex sm:hidden justify-center items-center self-center px-11 h-12 bg-black1 rounded-[31px] text-white tracking-[0.675px]'>
                        buy yay
                    </a>
                    <div className='block sm:hidden w-fit mx-auto'>
                        <ConnectWallet />
                    </div>
                </div>
            }
        </header>
    )
}

export default Header