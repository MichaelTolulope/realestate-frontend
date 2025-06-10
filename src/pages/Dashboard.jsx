import React, { useState } from 'react'
import MiniCard from '../components/MiniCard'
import { FaEye, FaShare } from 'react-icons/fa'
import AddProperty from './AddProperty'
// import RevenueChart from '../components/RevenueChart'
import { useTheme } from '../context/ThemeContext'

const Dashboard = () => {
    const [showAddListingForm, setShowAddListingPage] = useState(false)
    const [success, setSuccess] = useState(false)
    const {theme} = useTheme()
    const cardData = [
        {
            title: "Page Views",
            icon: FaEye,
            value: "53,000"
        },
        {
            title: "Page Views",
            icon: FaEye,
            value: "53,000"
        },
        {
            title: "Total Requests",
            icon: FaShare,
            value: "53,000"
        },
        {
            title: "Page Views",
            icon: FaEye,
            value: "53,000"
        }
    ]
    return (
        <div className='flex flex-col gap-5 px-5'>
            <div className='flex justify-between items-center px-3 mt-3 mb-5'>
                <h2 className='text-[20px] font-bold'>Dashboard</h2>
                <button className="bg-black text-white px-5 py-[9px] rounded-2xl" onClick={() => {
                    setShowAddListingPage(!showAddListingForm)
                }}>
                    Add Property
                </button>
            </div>
            <div className='flex gap-4 justify-between mb-3'>
                {
                    cardData.map((data,index) => (
                        <MiniCard key={index} title={data.title} value={data.value}>
                            {React.createElement(data.icon)}
                        </MiniCard>
                    ))
                }
                
            </div>
            {/* <RevenueChart/> */}
            {showAddListingForm && <AddProperty show={setShowAddListingPage} setSuccess={setSuccess} />
            }

        </div>
    )
}

export default Dashboard