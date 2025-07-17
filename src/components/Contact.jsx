import { Swiper, SwiperSlide } from 'swiper/react'
import houseBanner from '../assets/images/realEstatePic.jpg'
import housePic1 from '../assets/images/housePic.jpg'
import housePic2 from '../assets/images/housePic1.jpg'
import { FaChevronLeft, FaChevronRight, FaPlay, FaSearch } from 'react-icons/fa'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import supabase from '../util/supabase'
import { toast } from 'sonner'
import { useState } from 'react'

const Contact = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, phone, email, message);

    if (!firstName || !lastName || !phone || !email || !message) {
      toast.warning("All fields are required!")
      return new Error("Al fields are required");
    }
    
    setIsSending(true)

    const { data, error, status } = await supabase
      .from("contact")
      .insert([{
        firstName,
        lastName,
        phone,
        email,
        message
      }]).select()
    setIsSending(false)

    if (error) {
      toast.error("error occured!")
      throw error;
    }

    setFirstName("")
    setLastName("")
    setPhone("")
    setEmail("")
    setMessage("")
    toast.success("Request sent successfully!")


  };


  return (
    <section>
      <div className="bg-gray-800 text-white  flex flex-col md:flex-row">
        <div className=' h-[350px] md:h-[550px] overflow-hidden w-full md:w-[400px] lg:w-[750px]'>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-btn-next',
              prevEl: '.swiper-btn-prev',
              clickable: true
            }}
            className='relative w-full '>
            <SwiperSlide>
              <div className='w-full'>
                <img src={houseBanner} alt="" className='object-cover w-full  h-[350px] md:h-[550px]' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='w-full'>
                <img src={housePic1} alt="" className='object-cover w-full  h-[350px] md:h-[550px]' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='w-full'>
                <img src={housePic2} alt="" className='object-cover w-full  h-[350px] md:h-[550px]' />
              </div>
            </SwiperSlide>
            <div className=' w-full flex justify-end gap-3 py-5 slider-controler absolute bottom-0 z-10 px-5'>
              <button className='rounded-full p-4 bg-transparent border-white border-2 text-[30px] swiper-btn-prev'><FaChevronLeft className='font-thin  text-slate-200' /></button>
              <button className='rounded-full p-4 bg-transparent border-white border-2 text-[30px] swiper-btn-next'><FaChevronRight className='font-thin text-slate-200' /></button>
            </div>
          </Swiper>
        </div>
        <div className="container mx-auto px-6 py-16 flex-1">
          <h2 className="text-3xl font-semibold mb-6">Still haven’t found what you’re looking for?</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              className="px-3 py-4 rounded-2xl bg-gray-700"
              onChange={(e) => { setFirstName(e.target.value) }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              className="px-3 py-4 bg-gray-700 rounded-2xl"
              onChange={(e) => { setLastName(e.target.value) }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="px-3 py-4 rounded-2xl bg-gray-700 "
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              className="px-3 py-4 rounded-2xl bg-gray-700"
              onChange={(e) => { setPhone(e.target.value) }}
            />
            <textarea
              placeholder="Message"
              className="px-3 py-4 rounded-2xl bg-gray-700 col-span-full"
              rows="4"
              value={message}
              onChange={(e) => { setMessage(e.target.value) }}
            ></textarea>
            <button type='submit' className="bg-white text-black px-4 py-4 rounded-2xl w-full md:w-auto">
              {isSending ? "Submiting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact