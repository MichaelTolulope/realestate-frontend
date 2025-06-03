import React, { useEffect, useRef, useState } from 'react'
import { isCookie, useNavigate, useNavigation } from 'react-router'
import Header from '../components/header'
import houseBanner from '../assets/images/realestatePic.jpg'
import housePic1 from '../assets/images/housePic1.jpg'
import housePic2 from '../assets/images/housePic.jpg'
import videoBanner from '../assets/videos/houseVid.mp4'
import { FaChevronLeft, FaChevronRight, FaPlay, FaSearch } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, EffectCoverflow, Mousewheel } from 'swiper/modules'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import DiscoverProperties from '../components/DiscoverProperties'
import LandingCarousel from '../components/LandingCarousel'

const Home = () => {
  // SwiperCore.use([Navigation, Pagination, ]);
  const navigate = useNavigate()
  const [filters, setFilters] = useState({})
 

  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) videoRef.current.pause();
  };


  // form search

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    console.log(filters);

  };

  const handleSearch = (e) => {
    e.preventDefault();
  
    // Clean filters by removing keys with empty or undefined values
    const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.trim() !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
  
    // Navigate with cleaned filters
    navigate("/properties", { state: cleanedFilters });
  };


  return (
    <div className="font-sans antialiased bg-white ">
      {/* <Header /> */}
      {/* <LandingCarousel/> */}

      {/* Hero Section */}
      <section className=" py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-semibold mb-4">
            Guiding your path <br /> to a new home in <span className="text-gray-700">Lagos, Nigeria.</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover your dream home with our expert guidance and the best property listings.
          </p>
        </div>
      </section>

      <section className='relative w-[95%] m-auto mb-10 flex flex-col gap-5'>
        {/* Property Search */}
        <div className=' h-[350px] rounded-3xl py-5 px-10 '
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('${houseBanner}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
        </div>
        <div className="w-full md:px-6 sm:px-0 md:absolute lg:absolute bottom-7 ">
          <form onSubmit={handleSearch} className="flex flex-wrap justify-between gap-4 w-full  bg-white rounded-2xl shadow-lg py-5 px-10">
            <div className=' w-full gap-4 container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 overflow-auto '>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="search">Looking For?</label>
                <input
                  type="text"
                  placeholder="What to look for?"
                  name="search"
                  className="border px-2 py-3 w-full rounded-xl"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="type">Type</label>
                <select
                  name="type"
                  className="border px-2 py-3 w-full rounded-xl"
                  onChange={handleInputChange}
                >
                  <option value="">Property Type</option>
                  <option value="For Sale">Sale</option>
                  <option value="For Rent">Rent</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="price">Price</label>
                <select
                  name="price"
                  className="border px-2 py-3 w-full rounded-xl"
                  onChange={handleInputChange}
                >
                  <option value="">Price</option>
                  <option value="0-100000">Under 100,000</option>
                  <option value="100000-500000">100,000 - 500,000</option>
                  <option value="500000-500000000">500,000 - 500,000,000</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="city">Cities</label>
                <select
                  name="city"
                  className="border px-2 py-3 w-full rounded-xl"
                  onChange={handleInputChange}
                >
                  <option value="">All Cities</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                </select>
              </div>
              <div className='flex-1 flex flex-col gap-2 justify-end'>
                <button type="submit" className="flex items-center gap-4 justify-center bg-black text-white px-6 py-3 rounded-xl w-full md:w-auto">
                  <FaSearch className='text-[20px]' />
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

      </section>
      {/* Video Section */}
      <section
        className="py-16 w-full group mt-20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto">
          <div className="relative overflow-hidden w-full h-[550px]">
            {/* Video */}
            <video
              ref={videoRef}
              muted
              loop
              className="w-full h-full object-cover"
            >
              <source src={videoBanner} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex  items-center justify-center ">
              <button className="absolute bg-grey-400 p-6 rounded-full shadow-md border-2 group-hover:hidden">
                <FaPlay className='text-white' />
              </button>
              <div className='flex justify-between w-full px-10 self-end items-center mb-20 flex-col lg:flex-row md:flex-row sm:flex-col sm:gap-5 '>
                <div>
                  <h2 className='text-white text-[30px]'>What is Aruno Homes?</h2>
                </div>
                <div className='lg:w-[700px]'>
                  <p className='text-white text-[20px] md:text-left sm:text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed quo odit inventore,
                    cum culpa nemo minima,
                    illo quis corporeius blanditiis commodi, amet dolorem laboriosam!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DiscoverProperties />

      {/* <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Explore Our Property Listings
        </h2>
        <div className="">
          <Swiper
             navigation={{
              nextEl: '.swiper-btn-next',
              prevEl: '.swiper-btn-prev',
              clickable: true
             }}
            //  pagination={{ clickable: true }}
             effect="coverflow"
             grabCursor={true}   
            //  mousewheel       
             centeredSlides={true}
             coverflowEffect={{
               rotate: 0,
               stretch: 0,
               depth: 100,
               modifier: 3,
               slideShadows: false
             }}
             slidesPerView={1.4}
             loop={true}
             style={{ height: "fit-content", padding:'20px' }}

             modules={[EffectCoverflow,Navigation,Pagination, Mousewheel]}
             className='swiper-container overflow-hidden '
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <SwiperSlide>
                <div key={item} className=" sm:p-5 sm:w-[320px] md:w-[500px] lg:w-[700px] bg-white">
                  <img
                    src={houseBanner}
                    alt="Property"
                    className=" object-cover rounded-2xl sm:w-[320px] md:w-[500px] lg:w-[700px]"
                  />
                  <div className='flex justify-between mt-3 '>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Serenity Heights</h3>
                    <p className="text-slate-600">4 Beds • 2 Baths • 1800 sqft</p>
                  </div>
                  <p className='flex-1 text-slate-600 sm:hidden md:hidden lg:block'>Lorem ipsum dolor consectetur adipisicing elit. 
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              
            ))}
            <div className=' w-full flex justify-end gap-3 py-5 slider-controler'>
              <button className='rounded-full p-4 bg-transparent border-slate-300 border-2 text-[30px] swiper-btn-prev'><FaChevronLeft className='font-thin  text-slate-600'/></button>
              <button className='rounded-full p-4 bg-transparent border-slate-300 border-2 text-[30px] swiper-btn-next'><FaChevronRight className='font-thin text-slate-600'/></button>
            </div>

          </Swiper>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section id='faq' className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="border-b py-4">
            <summary className="cursor-pointer font-semibold">
              How do I start the process of buying a property?
            </summary>
            <p className="text-gray-600 mt-2">
              Contact our team to assist you with finding the right property.
            </p>
          </details>
          <details className="border-b py-4">
            <summary className="cursor-pointer font-semibold">
              Can Aruna assist with financing or mortgages?
            </summary>
            <p className="text-gray-600 mt-2">
              Yes, we can help connect you to financing options.
            </p>
          </details>
        </div>
      </section>

      {/* Contact Form */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  )
}


export default Home;