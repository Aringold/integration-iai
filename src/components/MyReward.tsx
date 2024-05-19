import { formatEther } from 'viem'
import { useAccount, useContractRead, useContractWrite, useNetwork } from 'wagmi'

import StakingABI from '../abis/YayStaking.json'
import { commafy } from '../utils/stringify'
import { blank, info } from '../abis'

const MyReward = () => {
    const { chain } = useNetwork()
    const chainId: number = chain?.id ?? 56
    const { address } = useAccount()
    const { data: rewardBNB } = useContractRead({
        address: info[56]?.STAKING,
        abi: StakingABI,
        functionName: 'getRewardAmount',
        args: [address ?? blank],
        chainId: 56,
        watch: true
    })
    const { data: rewardAVAX } = useContractRead({
        address: info[43114]?.STAKING,
        abi: StakingABI,
        functionName: 'getRewardAmount',
        args: [address ?? blank],
        chainId: 43114,
        watch: true
    })
    const { data: cdInfo } = useContractRead({
        address: info[chainId]?.STAKING,
        abi: StakingABI,
        functionName: 'getCooldown',
        args: [address ?? blank],
        chainId,
        watch: true
    })
    const { writeAsync: claimSync, status: statusClaim } = useContractWrite({
        address: info[chainId]?.STAKING,
        abi: StakingABI,
        functionName: 'claimReward',
        chainId,
    })
    const cdArray = cdInfo as Array<boolean | bigint>
    const claim = async () => {
        await claimSync()
    }
    return (
        <section className='flex flex-col p-7 bg-white rounded-[27px]'>
            <div className='flex justify-between items-center'>
                <span className='font-medium text-[23px] leading-[28px] text-black5'>My Rewards</span>
                <div className='flex justify-center items-center w-[123px] h-10 border border-black3 rounded-[25.21px] text-[14px] leading-[16.71px] tracking-[0.5%] text-black3'>
                    Coming soon
                </div>
            </div>
            <div className='flex justify-between items-center mt-4'>
                <span className='text-black1 text-[17px] leading-[28px]'>
                    {rewardBNB ? commafy(parseFloat(parseFloat(formatEther(rewardBNB as bigint)).toFixed(3))) : 0}
                    <span className='text-black3'> YAY</span>
                </span>
                <img src='/images/BSC.svg' />
            </div>
            <div className='flex justify-between items-center mt-2'>
                <span className='text-black1 text-[17px] leading-[28px]'>
                    {rewardAVAX ? commafy(parseFloat(parseFloat(formatEther(rewardAVAX as bigint)).toFixed(3))) : 0}
                    <span className='text-black3'> YAY</span>
                </span>
                <img src='/images/AVAX.svg' />
            </div>
            <button className='flex justify-center items-center space-x-2 h-12 rounded-[31px] mt-5 bg-black1 text-white font-medium text-[17px] tracking-[0.5%] disabled:cursor-not-allowed disabled:opacity-20 relative' onClick={claim} disabled>
                {statusClaim === 'loading' ?
                    <>
                        <div className='flex justify-center items-center'>
                            <svg className='spinnerInner1' viewBox='0 0 120 120'>
                                <circle cx='60' cy='60' r='50' />
                            </svg>
                        </div>
                        <span>Processing</span>
                    </>
                    :
                    'Claim tokens'
                }
            </button>
        </section>
    )
}

export default MyReward