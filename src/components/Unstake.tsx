import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { useAccount, useContractRead, useContractWrite, useNetwork, useWaitForTransaction } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import Countdown, { CountdownApi } from 'react-countdown'

import HtmlTooltip from './HtmlTooltip'
import StakingABI from '../abis/YayStaking.json'
import { blank, info } from '../abis'
import { RefContext } from '../contexts/RefContextProvider'

const CooldownTimer = ({ days, hours, minutes, seconds, completed }: any) => {
    return (
        <div className='flex items-center gap-3 text-[14px] tracking-[0.5%] flex-wrap'>
            <div className='flex space-x-2'>
                <div className='flex justify-center items-center w-10 h-10 rounded-[12px] border border-black1'>{Math.floor(days / 10)}</div>
                <div className='flex justify-center items-center w-10 h-10 rounded-[12px] border border-black1'>{Math.floor(days % 10)}</div>
            </div>
            <span>:</span>
            <div className='flex space-x-2'>
                <div className='flex justify-center items-center w-10 h-10 rounded-[12px] border border-black1'>{Math.floor(hours / 10)}</div>
                <div className='flex justify-center items-center w-10 h-10 rounded-[12px] border border-black1'>{Math.floor(hours % 10)}</div>
            </div>
            <span>:</span>
            <div className='flex space-x-2'>
                <div className='flex justify-center items-center w-10 h-10 rounded-[12px] border border-black1'>{Math.floor(minutes / 10)}</div>
                <div className='flex justify-center items-center w-10 h-10 rounded-[12px] border border-black1'>{Math.floor(minutes % 10)}</div>
            </div>
            <span>:</span>
            <div className='flex space-x-2'>
                <div className='flex justify-center items-center w-10 h-10 rounded-[12px] border border-black1'>{Math.floor(seconds / 10)}</div>
                <div className='flex justify-center items-center w-10 h-10 rounded-[12px] border border-black1'>{Math.floor(seconds % 10)}</div>
            </div>
        </div>
    )
}

const UnlockTimer = ({ days, hours, minutes, seconds, completed }: any) => {
    return (
        <>
            {Math.floor(days / 10)}
            {Math.floor(days % 10)}{' : '}
            {Math.floor(hours / 10)}
            {Math.floor(hours % 10)}{' : '}
            {Math.floor(minutes / 10)}
            {Math.floor(minutes % 10)}{' : '}
            {Math.floor(seconds / 10)}
            {Math.floor(seconds % 10)}
        </>
    )
}

const Unstake = () => {
    const regex = /^$|^[0-9]+(\.[0-9]*)?$/
    const { chain } = useNetwork()
    const chainId: number = chain?.id ?? 56
    const { address } = useAccount()
    const [amount, setAmount] = useState('')
    const countdownApiRef = useRef<CountdownApi | null>(null)
    const { setOpenUnstakeFailModal, setOpenUnstakeSuccessModal, unstakeHash, setUnstakeHash, setOpenCDModal, cdHash, setCDHash }: any = useContext(RefContext)
    const { data: cdInfo } = useContractRead({
        address: info[chainId]?.STAKING,
        abi: StakingABI,
        functionName: 'getCooldown',
        args: [address ?? blank],
        chainId,
        watch: true,
    })
    const { data: _myStaking } = useContractRead({
        address: info[chainId]?.STAKING,
        abi: StakingABI,
        functionName: 'balanceOf',
        args: [address ?? blank],
        chainId,
        watch: true,
    })
    const { writeAsync: unstakeSync, status: statusUnstake } = useContractWrite({
        address: info[chainId]?.STAKING,
        abi: StakingABI,
        functionName: 'unStake',
        chainId,
        onSuccess: ({ hash }) => {
            setUnstakeHash(hash)
            setOpenUnstakeSuccessModal(true)
        },
        onError: () => setOpenUnstakeFailModal(true)
    })
    const { writeAsync: cdSync, status: statusCD } = useContractWrite({
        address: info[chainId]?.STAKING,
        abi: StakingABI,
        functionName: 'cooldown',
        chainId,
        onSuccess: ({ hash }) => {
            setCDHash(hash)
            setOpenCDModal(true)
        }
    })
    const { status: statusUnstakeConfirmed } = useWaitForTransaction({ hash: unstakeHash })
    const { status: statusCDConfirmed } = useWaitForTransaction({ hash: cdHash })
    const myStaking = _myStaking as bigint
    const cdArray = cdInfo as Array<boolean | bigint> ?? [false, false, BigInt(0)]
    const cooldown = async () => await cdSync()
    const unstake = async () => {
        if (amount.length === 0) return
        if (parseFloat(amount) === 0) return
        await unstakeSync({ args: [parseEther(amount as `${number}`)] })
    }
    const setRef = (countdown: Countdown | null) => {
        if (countdown) {
            countdownApiRef.current = countdown.getApi();
        }
    }
    const setPercent = (percent: number) => {
        const _converted = parseFloat(formatEther(myStaking as bigint)) * percent
        setAmount(_converted.toString())
    }
    return (
        <section className='flex flex-col p-7 bg-white rounded-[40px]'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0'>
                <div className='flex items-center space-x-[18px] font-medium text-[33px] text-black1'>
                    <img src='/images/logo_pink.svg' />
                    <span>Unstake</span>
                </div>
            </div>
            <div className='flex justify-between items-center space-x-2 px-1 py-2.5 border-b border-black1 mt-7 text-[23px]'>
                <input className='flex-1 w-0 leading-[28px] placeholder-black6' placeholder='0 YAY' value={amount} onChange={e => regex.test(e.target.value) && setAmount(e.target.value)} />
                <span className='text-black6 leading-[28px]'>Available: {myStaking ? parseFloat(formatEther(myStaking as bigint)).toFixed(3) : 0}</span>
            </div>
            <span className='flex items-center space-x-1 text-black3 mt-2.5'>
                {cdArray?.[0] === false && cdArray?.[1] === false &&
                    <>
                        <span className='text-[17px] leading-[28px]'>To unstake, activate the cooldown</span>
                        <HtmlTooltip
                            className='yay-tooltip'
                            placement='right-start'
                            title={
                                <Fragment>
                                    <div className='flex flex-col space-y-4 border border-black rounded-[25.21px] bg-white p-[18px]'>
                                        <span className='font-medium text-[14px] text-black7'>Cooldown & Unstake Window Period</span>
                                        <span className='text-[11px] leading-[15px] text-black8'>
                                            You can only unstake your YAY after the cooldown period ends and the unstake window is active.<br /><br />
                                            The cooldown period can be activated by pressing the ‘Cooldown’ button. Once the time expires, you’re free to withdraw within the time frame of the unstake window.<br /><br />
                                            If you fail to withdraw your assets during the unstake window, you need to activate the cooldown period again and wait for the next unstake window.
                                        </span>
                                    </div>
                                </Fragment>
                            }
                        >
                            <svg xmlns='http://www.w3.org/2000/svg' width='15' height='16' viewBox='0 0 15 16' fill='none'>
                                <path d='M6.83203 9.68555V9.27539C6.79102 8.46094 7.11914 7.92773 7.92773 7.45312C8.6543 7.01367 8.90039 6.69727 8.90039 6.12305V6.11719C8.90039 5.49023 8.40234 5.04492 7.66992 5.04492C6.91406 5.04492 6.43945 5.51367 6.38672 6.18164L6.38086 6.23438H5.00391L5.00977 6.16992C5.07422 4.85742 6.00586 3.84961 7.74609 3.84961C9.3457 3.84961 10.4238 4.76953 10.4238 6.06445V6.07031C10.4238 6.96094 9.97852 7.58789 9.18164 8.0625C8.41406 8.50781 8.19727 8.81836 8.19727 9.39258V9.68555H6.83203ZM7.53516 12.4395C7.06055 12.4395 6.67969 12.0762 6.67969 11.6133C6.67969 11.1445 7.06055 10.7871 7.53516 10.7871C8.00977 10.7871 8.38477 11.1445 8.38477 11.6133C8.38477 12.0762 8.00977 12.4395 7.53516 12.4395Z' fill='#ACACAC' />
                                <path fillRule='evenodd' clipRule='evenodd' d='M7.5 14.2C10.9242 14.2 13.7 11.4242 13.7 8C13.7 4.57583 10.9242 1.8 7.5 1.8C4.07583 1.8 1.3 4.57583 1.3 8C1.3 11.4242 4.07583 14.2 7.5 14.2ZM7.5 15.5C11.6421 15.5 15 12.1421 15 8C15 3.85786 11.6421 0.5 7.5 0.5C3.35786 0.5 0 3.85786 0 8C0 12.1421 3.35786 15.5 7.5 15.5Z' fill='#ACACAC' />
                            </svg>
                        </HtmlTooltip>
                    </>
                }
                {cdArray?.[0] === true &&
                    <span className='text-[17px] leading-[28px]'>To unstake, please wait the cooldown</span>
                }
                {cdArray?.[1] === true &&
                    <span className='text-[17px] leading-[28px]'>How much would you like to unstake?{'\u00a0'}{'\u00a0'}{'\u00a0'}
                        <Countdown
                            ref={setRef}
                            now={() => Date.now()}
                            date={parseInt(cdArray?.[2].toString()) * 1000 + 1000 * 60 * 60 * 24 * 44}
                            renderer={UnlockTimer}
                        // onComplete={() => document.location.reload()}
                        />
                    </span>
                }
            </span>
            <div className='flex justify-between gap-3 items-center mt-5 font-medium flex-wrap'>
                {(cdArray?.[0] === false && cdArray?.[1] === false) &&
                    <Countdown
                        ref={setRef}
                        now={() => Date.now()}
                        date={Date.now() + 1000 * 60 * 60 * 24 * 30}
                        renderer={CooldownTimer}
                        autoStart={false}
                    />
                }
                {cdArray?.[0] === true &&
                    <Countdown
                        ref={setRef}
                        now={() => Date.now()}
                        date={parseInt(cdArray?.[2].toString()) * 1000 + 1000 * 60 * 60 * 24 * 30}
                        renderer={CooldownTimer}
                    />
                }
                {cdArray?.[1] === true &&
                    <div className='flex items-center gap-2.5 flex-wrap'>
                        <button className='flex justify-center items-center w-[72px] h-10 rounded-full border border-black1 text-[14px] tracking-[0.5%]' onClick={() => setPercent(0.25)}>25%</button>
                        <button className='flex justify-center items-center w-[72px] h-10 rounded-full border border-black1 text-[14px] tracking-[0.5%]' onClick={() => setPercent(0.5)}>50%</button>
                        <button className='flex justify-center items-center w-[72px] h-10 rounded-full border border-black1 text-[14px] tracking-[0.5%]' onClick={() => setPercent(0.75)}>75%</button>
                        <button className='flex justify-center items-center w-[72px] h-10 rounded-full border border-black1 text-[14px] tracking-[0.5%]' onClick={() => setPercent(1)}>MAX</button>
                    </div>
                }
                {cdArray?.[0] === false && cdArray?.[1] === false &&
                    <button className='flex justify-center items-center space-x-2 w-[176px] h-12 rounded-[31px] bg-black1 text-white text-[17px] tracking-[0.5%] disabled:cursor-not-allowed disabled:opacity-20 relative ml-auto' onClick={cooldown} disabled={!(statusCD !== 'loading' && statusCDConfirmed !== 'loading' && (myStaking ? parseFloat(formatEther(myStaking as bigint)) : 0) > 0 && (chain?.id === 56 || chain?.id === 43114))}>
                        {(statusCD === 'loading' || statusCDConfirmed === 'loading') ?
                            <>
                                <div className='flex justify-center items-center'>
                                    <svg className='spinnerInner1' viewBox='0 0 120 120'>
                                        <circle cx='60' cy='60' r='50' />
                                    </svg>
                                </div>
                                <span>Processing</span>
                            </>
                            :
                            'Cooldown'
                        }
                    </button>
                }
                {cdArray?.[1] === true &&
                    <button className='flex justify-center items-center space-x-2 w-[176px] h-12 rounded-[31px] bg-black1 text-white text-[17px] tracking-[0.5%] disabled:cursor-not-allowed disabled:opacity-20 relative' onClick={unstake} disabled={!(statusUnstake !== 'loading' && statusUnstakeConfirmed !== 'loading' && amount.length > 0 && parseFloat(amount) > 0 && myStaking >= parseEther(amount as `${number}`) && cdArray?.[1] === true && (chain?.id === 56 || chain?.id === 43114))}>
                        {(statusUnstake === 'loading' || statusUnstakeConfirmed === 'loading') ?
                            <>
                                <div className='flex justify-center items-center'>
                                    <svg className='spinnerInner1' viewBox='0 0 120 120'>
                                        <circle cx='60' cy='60' r='50' />
                                    </svg>
                                </div>
                                <span>Processing</span>
                            </>
                            :
                            'Unstake'
                        }
                    </button>
                }
            </div>
        </section>
    )
}

export default Unstake