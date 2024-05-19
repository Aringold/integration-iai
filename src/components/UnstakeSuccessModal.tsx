import { useContext } from 'react'
import { Modal } from '@mui/material'
import { useNetwork } from 'wagmi'

import { RefContext } from '../contexts/RefContextProvider'
import { info } from '../abis'

const UnstakeSuccessModal = () => {
    const { chain } = useNetwork()
    const chainId: number = chain?.id ?? 56
	const { openUnstakeSuccessModal: open, setOpenUnstakeSuccessModal, unstakeHash }: any = useContext(RefContext)
	const close = async () => setOpenUnstakeSuccessModal(false)
	return (
		<Modal open={open}>
			<div className={'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none w-[calc(100vw-40px)] md:w-[500px] bg-white rounded-[32px] p-[43px] relative'}>
				<button className='absolute top-[35px] right-[35px]' onClick={close}>
					<img src='/images/close.svg' />
				</button>
				<div className='flex flex-col items-center text-center'>
					<span className='text-[33px] leading-[15px] self-start'>Success</span>
					<img className='h-[84px] mt-[57px]' src='/images/logo_black.svg' />
					<span className='text-[23px] mt-16'>You have unstaked successfully!</span>
					<a className='text-pink1 text-[17px] mt-5' target='_blank' href={`https://${info[chainId]?.EXPLORER}/tx/${unstakeHash}`}>View on {info[chainId]?.EXPLORER}</a>
				</div>
			</div>
		</Modal>
	)
}

export default UnstakeSuccessModal