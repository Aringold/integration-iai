import { ConnectButton } from '@rainbow-me/rainbowkit'

const ConnectWallet = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                return (
                    <div className='w-full'
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button className='w-full px-5 h-12 rounded-[31px] bg-black1 text-white font-medium disabled:cursor-not-allowed disabled:opacity-20 tracking-[0.675px]' onClick={openConnectModal}>CONNECT WALLET</button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <button className='w-full px-5 h-12 rounded-[31px] bg-pink1 text-white font-medium disabled:cursor-not-allowed disabled:opacity-20 tracking-[0.675px]' onClick={openChainModal} type='button'>
                                        WRONG NETWORK
                                    </button>
                                );
                            }

                            return (
                                <button className='w-full px-5 h-12 rounded-[31px] bg-white border border-black1 text-black1 font-medium text-[17px] tracking-[0.5%] disabled:cursor-not-allowed disabled:opacity-20 tracking-[0.675px]' onClick={openAccountModal}>{account.displayName}</button>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default ConnectWallet