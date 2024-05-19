const Footer = () => {
    return (
        <footer className='bg-black1'>
            <div className=''>
                <div className='flex flex-col relative px-5 xl:px-[100px]'>
                    <div className='flex flex-col lg:flex-row lg:justify-between my-12 lg:my-[100px]'>
                        <div className='flex justify-between xl:justify-start space-x-10 xl:space-x-[88px] text-[17px] font-normal text-black4'>
                            <div className='flex flex-col space-y-3'>
                                <span>Blog</span>
                                <span>Apply for IDO</span>
                                <span>How to use</span>
                                <span>IDO & INO Fundraising </span>
                            </div>
                            <div className='flex flex-col space-y-3'>
                                <span>Dev Boutique</span>
                                <span>Startup Incubation</span>
                                <span>Smart contracts</span>
                                <span>FAQ</span>
                            </div>
                            <div className='flex flex-col space-y-3'>
                                <span>Terms of use</span>
                                <span>Privacy</span>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-7 mt-20 lg:mt-0'>
                            <div className='flex flex-col md:flex-row space-y-3 md:space-x-3 md:space-y-0'>
                                <div className='flex items-center border border-black4 rounded-[31px] px-6 h-12 md:flex-1'>
                                    <input className='text-black4 text-[17px] leading-[20.29px] tracking-[0.085px] placeholder-black4' placeholder='Email address'/>
                                </div>
                                <button className='flex justify-center items-center space-x-3 px-6 h-12 uppercase rounded-[31px] bg-white text-black1'>
                                    <span className='font-medium text-[15px] tracking-[0.675px]'>Subscribe</span>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='15' viewBox='0 0 16 15' fill='none' stroke='currentColor'>
                                        <path d='M7.80414 0.524902L14.4762 7.38204M14.4762 7.38204L7.80414 14.2392M14.4762 7.38204H0' strokeWidth='1.5' />
                                    </svg>
                                </button>
                            </div>
                            <span className='text-black3 text-[14px] leading-[20px] tracking-[0.07px]'>You’ll receive occasional emails from YAY Network. You always have the choice <br className='hidden lg:block' />to unsubscribe within every email.</span>
                        </div>
                    </div>
                    <div className='bg-black3 w-full h-[1px]' />
                    <div className='flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0 my-9 text-black3 relative'>
                        <div className='flex items-center space-x-3'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='42' height='38' viewBox='0 0 42 38' fill='none'>
                                <path fillRule='evenodd' clipRule='evenodd' d='M0 0L10.4891 18.8581H20.6955L9.98322 0H0ZM41.7075 0L31.219 18.857H21.0126L31.7243 0H41.7075ZM20.9322 18.9985L26.0363 28.1749L20.8536 37.4926H10.4267L20.9322 18.9985Z' fill='#ACACAC' />
                            </svg>
                            <span className='text-[14px] leading-[16.71px] tracking-[0.07px]'>Ⓒ2023. All right belongs Yay Network company.</span>
                        </div>
                        <a className='lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 text-[14px] leading-[16.71px] tracking-[0.07px]' href='mailto:hello@yay.network'>hello@yay.network</a>
                        <div className='flex flex-col tiny:flex-row space-y-[10px] tiny:space-x-[10px] tiny:space-y-0'>
                            <a href='https://twitter.com/yaynetwork' target='_blank' className='flex items-center space-x-[10px] px-[22px] h-10 border border-black3 rounded-[25.21px]'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='13' viewBox='0 0 16 13' fill='none'>
                                    <path d='M16 1.5C15.4 1.8 14.8 1.9 14.1 2C14.8 1.6 15.3 1 15.5 0.2C14.9 0.6 14.2 0.8 13.4 1C12.8 0.4 11.9 0 11 0C8.9 0 7.3 2 7.8 4C5.1 3.9 2.7 2.6 1 0.6C0.1 2.1 0.6 4 2 5C1.5 5 1 4.8 0.5 4.6C0.5 6.1 1.6 7.5 3.1 7.9C2.6 8 2.1 8.1 1.6 8C2 9.3 3.2 10.3 4.7 10.3C3.5 11.2 1.7 11.7 0 11.5C1.5 12.4 3.2 13 5 13C11.1 13 14.5 7.9 14.3 3.2C15 2.8 15.6 2.2 16 1.5Z' fill='#ACACAC' />
                                </svg>
                                <span>twitter</span>
                            </a>
                            <a href='https://t.me/yaynetwork' target='_blank' className='flex items-center space-x-[10px] px-[22px] h-10 border border-black3 rounded-[25.21px]'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='14' viewBox='0 0 16 14' fill='none'>
                                    <path d='M1.09992 5.7083C5.39487 3.83705 8.25885 2.60341 9.69185 2.00738C13.7834 0.30558 14.6335 0.00996027 15.1877 9.46359e-05C15.3095 -0.00194823 15.582 0.0282562 15.7586 0.171489C15.9076 0.292432 15.9486 0.455809 15.9683 0.570476C15.9879 0.685143 16.0123 0.946358 15.9929 1.15046C15.7712 3.48009 14.8118 9.13349 14.3237 11.7427C14.1172 12.8468 13.7105 13.217 13.3168 13.2532C12.4613 13.3319 11.8116 12.6878 10.9829 12.1446C9.68624 11.2946 8.95369 10.7654 7.69503 9.93601C6.24042 8.97744 7.18338 8.4506 8.01236 7.58959C8.22931 7.36426 11.999 3.93546 12.0719 3.62441C12.0811 3.58551 12.0895 3.44051 12.0034 3.36394C11.9172 3.28737 11.7901 3.31355 11.6983 3.33438C11.5683 3.36389 9.4968 4.73307 5.48389 7.4419C4.89591 7.84565 4.36333 8.04238 3.88616 8.03207C3.36012 8.0207 2.34822 7.73463 1.59598 7.49011C0.673328 7.19019 -0.0599784 7.03162 0.00387615 6.52227C0.0371355 6.25697 0.402482 5.98564 1.09992 5.7083Z' fill='#ACACAC' />
                                </svg>
                                <span>telegram</span>
                            </a>
                            <a href='https://yay-network.medium.com/' target='_blank' className='flex items-center space-x-[10px] px-[22px] h-10 border border-black3 rounded-[25.21px]'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='13' viewBox='0 0 16 13' fill='none'>
                                    <path d='M1.9 2.6C1.9 2.4 1.8 2.2 1.7 2.1L0.2 0.299999V0H4.8L8.4 7.9L11.6 0H16V0.299999L14.7 1.5C14.6 1.6 14.5 1.7 14.6 1.9V10.9C14.6 11 14.6 11.2 14.7 11.3L15.9 12.5V12.8H9.6V12.5L10.9 11.2C11 11.1 11 11 11 10.8V3.5L7.4 12.6H7L2.8 3.5V9.6C2.8 9.9 2.9 10.1 3 10.3L4.7 12.3V12.6H0V12.3L1.7 10.3C1.9 10.1 2 9.9 1.9 9.6V2.6Z' fill='#ACACAC' />
                                </svg>
                                <span>medium</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer