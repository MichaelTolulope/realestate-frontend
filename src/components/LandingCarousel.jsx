import React, { useState } from 'react'
import pic from '../assets/images/housePic.jpg'
import pic1 from '../assets/images/housePic1.jpg'
import pic2 from '../assets/images/realEstatePic.jpg'
import { motion } from 'framer-motion'
const LandingCarousel = () => {
    const items = [pic, pic1, pic2]
    const [slides, setSlides] = useState(items)
    const [currentSlide, setCurrentSlide] = useState(slides[slides.length - 1])


    const moveSlide = (index, img) => {
        setCurrentSlide(img)
        const newSlides = [...slides.slice(0, index), ...slides.slice(index + 1), img];
        setSlides(newSlides)
    }
    const transition = {
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
    }

    return (

        <div className='w-full  h-[80vh] bg-green-600 relative'>
            <div

                className='bg-gray-200 absolute inset-0'>
                {currentSlide&&(<motion.img
                    key={currentSlide}
                    // initial={{ opacity: 0 }}
                    layoutId={currentSlide}
                    transition={{
                        layout: { duration: 0.6 },
                        opacity: { ease: "linear" }
                    }}
                    exit={{ opacity: 0 }}
                    src={currentSlide} className='absolute inset-0 w-full h-full' alt="current Slide" />)
                    
                    }
            </div>
            <div className='bg-gray-300 rounded-2xl p-3 flex absolute bottom-8 right-2 h-[100px] gap-5'>
                {
                    slides.map((img, index) => (
                        <img src={img} key={index} alt="carousel items" className={`rounded-xl ${slides[0] == img && 'scale-125'}`} onClick={() => {
                            moveSlide(index, img)
                        }
                        } />
                    ))
                }
            </div>

        </div>
    )
}

export default LandingCarousel