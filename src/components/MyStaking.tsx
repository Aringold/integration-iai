import { useAccount, useContractRead } from 'wagmi'
import { formatEther } from 'viem'

import { commafy } from '../utils/stringify'
import StakingABI from '../abis/YayStaking.json'
import { blank, info } from '../abis'

const MyStaking = () => {
    const { address } = useAccount()
    const { data: _myStakingBSC } = useContractRead({
        address: info[56]?.STAKING,
        abi: StakingABI,
        functionName: 'balanceOf',
        args: [address ?? blank],
        chainId: 56,
        watch: true,
    })
    const { data: _myStakingAVAX } = useContractRead({
        address: info[43114]?.STAKING,
        abi: StakingABI,
        functionName: 'balanceOf',
        args: [address ?? blank],
        chainId: 43114,
        watch: true,
    })
    const myStakingBSC = _myStakingBSC as bigint
    const myStakingAVAX = _myStakingAVAX as bigint
    return (
        <section className='flex flex-col px-7 py-5 bg-white rounded-[27px]'>
            <div className='flex justify-between items-center'>
                <span className='font-medium text-[23px] leading-[28px] text-black5'>My Stake</span>
            </div>

            <div className='flex justify-between items-center mt-4'>
                <span className='text-black1 text-[17px] leading-[28px]'>
                    {myStakingBSC ? commafy(parseFloat(parseFloat(formatEther(myStakingBSC as bigint)).toFixed(3))) : 0}
                    <span className='text-black3'> YAY</span>
                </span>
                <img src='/images/BSC.svg' />
            </div>
            <div className='flex justify-between items-center mt-2'>
                <span className='text-black1 text-[17px] leading-[28px]'>
                    {myStakingAVAX ? commafy(parseFloat(parseFloat(formatEther(myStakingAVAX as bigint)).toFixed(3))) : 0}
                    <span className='text-black3'> YAY</span>
                </span>
                <img src='/images/AVAX.svg' />
            </div>
        </section>
    )
}

export default MyStaking