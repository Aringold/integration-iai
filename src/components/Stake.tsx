import { useContext, useState } from 'react'
import { formatEther, parseEther } from 'viem'
import { useAccount, useContractRead, useContractWrite, useNetwork, useWaitForTransaction } from 'wagmi'

import ChainChoose from './ChainChoose'
import TokenABI from '../abis/YayToken.json'
import StakingABI from '../abis/YayStaking.json'
import { blank, info } from '../abis'
import { RefContext } from '../contexts/RefContextProvider'

const Stake = () => {
    const regex = /^$|^[0-9]+(\.[0-9]*)?$/
    const { chain } = useNetwork()
    const chainId: number = chain?.id ?? 56
    const { address } = useAccount()
    const [amount, setAmount] = useState('')
    const [approveHash, setApproveHash] = useState()
    const { setOpenStakeSuccessModal, stakeHash, setStakeHash, setOpenApproveSuccessModal }: any = useContext(RefContext)
    const { data: _balance } = useContractRead({
        address: info[chainId]?.YAY,
        abi: TokenABI,
        functionName: 'balanceOf',
        args: [address ?? blank],
        chainId,
        watch: true,
    })
    const { data: _allowance } = useContractRead({
        address: info[chainId]?.YAY,
        abi: TokenABI,
        functionName: 'allowance',
        args: [address ?? blank, info[chainId]?.STAKING],
        chainId,
        watch: true,
    })
    const { writeAsync: approveSync, status: statusApprove } = useContractWrite({
        address: info[chainId]?.YAY,
        abi: TokenABI,
        functionName: 'approve',
        chainId,
        onSuccess: ({ hash }) => {
            setApproveHash(hash as any)
            setOpenApproveSuccessModal(true)
        }
    })
    const { writeAsync: stakeSync, status: statusStake } = useContractWrite({
        address: info[chainId]?.STAKING,
        abi: StakingABI,
        functionName: 'stake',
        chainId,
        onSuccess: ({ hash }) => {
            setStakeHash(hash)
            setOpenStakeSuccessModal(true)
        }
    })
    const { status: statusApproveConfirmed } = useWaitForTransaction({ hash: approveHash })
    const { status: statusStakeConfirmed } = useWaitForTransaction({ hash: stakeHash })
    const allowance = _allowance as bigint
    const balance = _balance as bigint
    const approve = async () => {
        if (amount.length === 0) return
        if (parseFloat(amount) === 0) return
        await approveSync({ args: [info[chainId]?.STAKING, parseEther(amount as `${number}`)] })
    }
    const stake = async () => {
        if (amount.length === 0) return
        if (parseFloat(amount) === 0) return
        await stakeSync({ args: [parseEther(amount as `${number}`)] })
    }
    const setPercent = (percent: number) => {
        const _converted = parseFloat(formatEther(balance as bigint)) * percent
        setAmount(_converted.toString())
    }
    return (
        <section className='flex flex-col p-7 bg-white rounded-[40px]'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0'>
                <div className='flex items-center space-x-[18px] font-medium text-[33px] text-black1'>
                    <img src='/images/logo_pink.svg' />
                    <span>Stake</span>
                </div>

                <ChainChoose />
            </div>
            <div className='flex justify-between items-center space-x-2 px-1 py-2.5 border-b border-black1 mt-7 text-[23px]'>
                <input className='flex-1 w-0 leading-[28px] placeholder-black6' placeholder='0 YAY' value={amount} onChange={e => regex.test(e.target.value) && setAmount(e.target.value)} />
                <span className='text-black6 leading-[28px]'>Available: {balance ? parseFloat(formatEther(balance as bigint)).toFixed(3) : 0}</span>
            </div>
            <span className='text-[17px] leading-[28px] text-black3 mt-2.5'>How much would you like to stake?</span>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 mt-5 font-medium'>
                <div className='flex items-center gap-2.5 flex-wrap'>
                    <button className='flex justify-center items-center w-[72px] h-10 rounded-full border border-black1 text-[14px] tracking-[0.5%]' onClick={() => setPercent(0.25)}>25%</button>
                    <button className='flex justify-center items-center w-[72px] h-10 rounded-full border border-black1 text-[14px] tracking-[0.5%]' onClick={() => setPercent(0.5)}>50%</button>
                    <button className='flex justify-center items-center w-[72px] h-10 rounded-full border border-black1 text-[14px] tracking-[0.5%]' onClick={() => setPercent(0.75)}>75%</button>
                    <button className='flex justify-center items-center w-[72px] h-10 rounded-full border border-black1 text-[14px] tracking-[0.5%]' onClick={() => setPercent(1)}>MAX</button>
                </div>
                {allowance >= parseEther(amount as `${number}`) ?
                    <button className='flex justify-center items-center space-x-2 w-[176px] h-12 rounded-[31px] bg-black1 text-white text-[17px] tracking-[0.5%] disabled:cursor-not-allowed disabled:opacity-20 relative' onClick={stake} disabled={!(statusStake !== 'loading' && statusStakeConfirmed !== 'loading' && amount.length > 0 && parseFloat(amount) > 0 && balance >= parseEther(amount as `${number}`) && (chain?.id === 56 || chain?.id === 43114))}>
                        {statusStake === 'loading' || statusStakeConfirmed === 'loading'?
                            <>
                                <div className='flex justify-center items-center'>
                                    <svg className='spinnerInner1' viewBox='0 0 120 120'>
                                        <circle cx='60' cy='60' r='50' />
                                    </svg>
                                </div>
                                <span>Processing</span>
                            </>
                            :
                            'Stake'
                        }
                    </button>
                    :
                    <button className='flex justify-center items-center space-x-2 w-[176px] h-12 rounded-[31px] bg-black1 text-white text-[17px] tracking-[0.5%] disabled:cursor-not-allowed disabled:opacity-20 relative' onClick={approve} disabled={!(statusApprove !== 'loading' && statusApproveConfirmed !== 'loading' && amount.length > 0 && parseFloat(amount) > 0 && balance >= parseEther(amount as `${number}`) && (chain?.id === 56 || chain?.id === 43114))}>
                        {(statusApprove === 'loading' || statusApproveConfirmed === 'loading') ?
                            <>
                                <div className='flex justify-center items-center'>
                                    <svg className='spinnerInner1' viewBox='0 0 120 120'>
                                        <circle cx='60' cy='60' r='50' />
                                    </svg>
                                </div>
                                <span>Processing</span>
                            </>
                            :
                            'Approve'
                        }
                    </button>
                }
            </div>
        </section>
    )
}

export default Stake