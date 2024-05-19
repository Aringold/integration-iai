import { useContractRead } from 'wagmi'
import { formatEther } from 'viem'

import StakingABI from '../abis/YayStaking.json'
import { commafy } from '../utils/stringify'
import { info } from '../abis'

const TotalStaked = () => {
    const { data: totalStakedBNB } = useContractRead({
        address: info[56]?.STAKING,
        abi: StakingABI,
        functionName: 'getTotalStaked',
        chainId: 56,
        watch: true,
    })
    const { data: totalStakedAVAX } = useContractRead({
        address: info[43114]?.STAKING,
        abi: StakingABI,
        functionName: 'getTotalStaked',
        chainId: 43114,
        watch: true,
    })
    return (
        <section className='flex flex-col px-7 py-5 bg-white rounded-[27px] flex-1'>
            <div className='flex justify-between items-center'>
                <span className='font-medium text-[23px] leading-[28px] text-black5'>Total Staked</span>
            </div>

            <div className='flex justify-between items-center mt-4'>
                <span className='text-black1 text-[17px] leading-[28px]'>
                    {totalStakedBNB ? commafy(parseFloat(parseFloat(formatEther(totalStakedBNB as bigint)).toFixed(3))) : 0}
                    <span className='text-black3'> YAY</span>
                </span>
                <img src='/images/BSC.svg' />
            </div>
            <div className='flex justify-between items-center mt-2'>
                <span className='text-black1 text-[17px] leading-[28px]'>
                    {totalStakedAVAX ? commafy(parseFloat(parseFloat(formatEther(totalStakedAVAX as bigint)).toFixed(3))) : 0}
                    <span className='text-black3'> YAY</span>
                </span>
                <img src='/images/AVAX.svg' />
            </div>
        </section>
    )
}

export default TotalStaked