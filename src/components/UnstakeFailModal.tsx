import { useContext } from 'react'
import { Modal } from '@mui/material'

import { RefContext } from '../contexts/RefContextProvider'

const UnstakeFailModal = () => {
	const { openUnstakeFailModal: open, setOpenUnstakeFailModal }: any = useContext(RefContext)
	const close = async () => setOpenUnstakeFailModal(false)
	return (
		<Modal open={open}>
			<div className={'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none w-[calc(100vw-40px)] md:w-[500px] bg-white rounded-[32px] p-[43px] relative'}>
				<button className='absolute top-[35px] right-[35px]' onClick={close}>
					<img src='/images/close.svg' />
				</button>
				<div className='flex flex-col items-center text-center'>
					<span className='text-[33px] leading-[15px] self-start'>Error</span>
					<span className='text-[53px] mt-[57px]'>Oops!</span>
					<span className='text-[23px] mt-16'>Unable to unstake. Try again later!</span>
					<button className='text-pink1 text-[17px] mt-1' onClick={close}>Go back to Staking</button>
				</div>
			</div>
		</Modal>
	)
}

export default UnstakeFailModal