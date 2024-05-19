import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TotalStaked from '../../components/TotalStaked'
import MyReward from '../../components/MyReward'
import Stake from '../../components/Stake'
import Unstake from '../../components/Unstake'
import MyStaking from '../../components/MyStaking'
import ApproveSuccessModal from '../../components/ApproveSuccessModal'
import StakeSuccessModal from '../../components/StakeSuccessModal'
import CooldownModal from '../../components/CooldownModal'
import UnstakeSuccessModal from '../../components/UnstakeSuccessModal'
import UnstakeFailModal from '../../components/UnstakeFailModal'

const Staking = () => {
    return (
        <div className='flex flex-col relative'>
            <Header />

            <div className='py-8 md:pt-[82px] md:pb-[111px] w-full'>
                <div className='px-5 xl:px-[100px]'>
                    <div className='flex flex-col lg:flex-row space-y-6 lg:space-x-6 lg:space-y-0'>
                        <div className='flex flex-col space-y-6 flex-1'>
                            <Stake />

                            <Unstake />
                        </div>
                        <div className='flex flex-col space-y-3.5 w-full lg:w-[400px]'>
                            <TotalStaked />

                            <MyStaking />

                            <MyReward />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <ApproveSuccessModal />

            <StakeSuccessModal />

            <UnstakeSuccessModal />

            <UnstakeFailModal />

            <CooldownModal />
        </div>
    )
}

export default Staking