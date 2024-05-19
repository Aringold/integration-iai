import { useAccount, useNetwork } from 'wagmi'

import { info } from '../abis'

const Address = () => {
    const { chain } = useNetwork()
    const chainId: number | undefined = chain?.id
    const { address, isConnected } = useAccount()
    return (
        (isConnected && address) ?
            <section className='flex justify-between items-center px-7 py-[18px] bg-white rounded-[27px]'>
                <div className='flex items-center space-x-[18px]'>
                    <div className='flex justify-center items-center w-12 h-12 bg-green1 rounded-[15px] font-semibold text-[14px] leading-[28px]'>
                        245
                    </div>
                    <span>{address.slice(0, 5)}...{address.slice(-5)}</span>
                </div>
                <a href={`${info[chainId as number]?.EXPLORER}address/0x2fD05265880d01149E38400c54eb5A7f9f13a904`} target='_blank'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='15' viewBox='0 0 16 15' fill='none'>
                        <path d='M2.24285 0.757149L14.799 0.928932M14.799 0.928932L14.9708 13.4851M14.799 0.928932L1.36396 14.364' stroke='#303030' strokeWidth='1.5' />
                    </svg>
                </a>
            </section>
            :
            null
    )
}

export default Address