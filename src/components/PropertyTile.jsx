import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from 'framer-motion'
import { useState } from "react";
import { useEffect } from "react";

const PropertyCard = ({ property }) => {
    const { images, name, address, price, id, bedrooms, bathrooms, 'land-area': area } = property;

    const [liked,setLiked] = useState()

    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/properties/${id}`)
    }

useEffect(() => {
  const likedProps = JSON.parse(localStorage.getItem('liked_properties')) || [];
  setLiked(likedProps.includes(id));
}, [id]);

 const toggleLike = (e) => {
    e.stopPropagation();

    let likedProps = JSON.parse(localStorage.getItem('liked_properties')) || [];

    if (liked) {
      likedProps = likedProps.filter(id => id !== id);
    } else {
      likedProps.push(id);
    }

    localStorage.setItem('liked_properties', JSON.stringify(likedProps));
    setLiked(!liked);
  };

    return (
        <div className=" max-w-[350px] rounded-2xl cursor-pointer" onClick={handleClick}>
            {/* Image Section */}
            <div className="relative w-full h-[230px] overflow-hidden rounded-2xl">


                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        nextEl: ".swiper-btn-next",
                        prevEl: ".swiper-btn-prev",
                        clickable: true,
                    }}
                    pagination={{
                        clickable: true,
                        // bulletClass: "custom-bullet",
                        // bulletActiveClass: "custom-bullet-active",
                    }}
                    className="relative w-full"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full relative">
                                <img
                                    src={typeof img === 'string' ? img : img.url}
                                    width={350}
                                    height={230}
                                    alt="property img"
                                    className="object-cover w-full h-[230px] hover:scale-105 transition-transform"
                                />

                            </div>
                        </SwiperSlide>
                    ))}
                    {/* {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full relative">
                                <img
                                    src={typeof img === 'string' ? img : img.url}
                                    width={350}
                                    height={230}
                                    alt="property img"
                                    className="object-cover w-full h-[230px] hover:scale-105 transition-transform"
                                />
                                ...
                            </div>
                        </SwiperSlide>
                    ))} */}

                    <button onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(e)

                    }} className="z-50 absolute top-3 right-3 bg-white text-gray-800 rounded-full p-2 shadow hover:bg-gray-100">
                        {liked ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <div className="w-full flex justify-end gap-3 py-5 slider-controler absolute bottom-0 z-10 px-5">
                        <button onClick={(e) => e.stopPropagation()} className="z-50 rounded-full p-2 bg-transparent border-white border-2 text-[30px] swiper-btn-prev">
                            <FaChevronLeft className="font-thin text-slate-200" />
                        </button>
                        <button onClick={(e) => e.stopPropagation()} className="z-50 rounded-full p-2 bg-transparent border-white border-2 text-[30px] swiper-btn-next">
                            <FaChevronRight className="font-thin text-slate-200" />
                        </button>
                    </div>
                </Swiper>

            </div>

            {/* Property Details */}
            <div className="py-4 px-1 flex-col gap-3">
                <div className="flex items-start justify-between">
                    <div className="">
                        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                        <p className="text-sm text-gray-600">{address}</p>
                    </div>
                    <p className="text-lg font-bold ">${price}</p>

                </div>
                {/* Info Section */}
                <div className="flex gap-4 text-sm text-gray-600 mt-3 w-full">
                    <span className="bg-gray-100 py-1 px-2 rounded-2xl">{bedrooms} Beds</span>
                    <span className="bg-gray-100 py-1 px-2 rounded-2xl">{bathrooms} Baths</span>
                    <span className="bg-gray-100 py-1 px-2 rounded-2xl">{area} m²</span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
