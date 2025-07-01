import { useEffect, useState } from "react";
import housePic from '../assets/images/housePic.jpg'
import housePic1 from '../assets/images/housePic1.jpg'
import housePic2 from '../assets/images/realEstatePic.jpg'
import { FaHome, FaShare, FaStar } from "react-icons/fa";
import { MdBathtub, MdCarRepair, MdKingBed } from "react-icons/md";
import { motion } from 'framer-motion'
import RequestForm from "./RequestForm";
const SingleProperty = ({ property }) => {

  const [imgList, setImgList] = useState(property.images)
  const [previewImgBg, setPreviewImgBg] = useState(imgList[0])
  const [previewImg, setPreviewImg] = useState(imgList[0])

  // useEffect(()=>{
  //   setImgList(property.images)
  //   setPreviewImg(imgList[0])
  // },[])

  return (
    <div className="min-h-screen w-full bg-gray-100 p-3 md:p-8">
      <div className=" flex flex-col md:flex-row w-full gap-10 pb-10">
        <div className="md:w-[50%]  flex flex-col gap-4">
          <div className=" w-full flex  flex-col gap-4">
            {/* main display image */}
            <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden flex-1">
           <img className=" absolute top-0 w-full h-[300px] md:h-[500px] object-cover" src={previewImg} alt="" />
              <motion.img
                key={previewImg} // Forces re-render when the image changes
                initial={{ scale: 0, y:-20, x:20 }} animate={{ scale: 1, y:0,x:0 }}
                // exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full h-[300px] md:h-[500px] object-cover" src={previewImg} alt="" />
            </div>
            {/* all the images */}
            <div className="w-[100%] flex gap-4 overflow-x-auto">
              {
                imgList.map((img, index) => (
                  <div
                    key={index}
                    className={`h-[85px] md:h-[120px] rounded-[15px] max-w-36 overflow-hidden group flex-1 ${previewImg === img && 'border-2 border-yellow-600 p-[2px]'}`}
                    onClick={() => {
                      
                      setPreviewImgBg(previewImg)
                      setPreviewImg(img)
                    }
                  }
                  >
                    <img
                      className="object-cover h-full w-full group-hover:scale-[1.1] transition-all rounded-xl"
                      src={img}
                      alt="property image"
                    />
                  </div>
                ))
              }
            </div>

           <RequestForm propertyId={property.id} additionalStyles={"hidde md:block"}/>
          </div>
        </div>
        <div className="flex flex-col md:w-[50%] py-2 gap-5">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-[30px] font-bold">{property.name}</h2>
              <span className="bg-gray-50 py-1 px-3 rounded-2xl size-fit flex items-center gap-2 text-[12px] font-bold text-gray-400 cursor-pointer"> <FaShare className="text-gray-400" /> Share</span>
            </div>
            <div className="flex gap-10 items-center">
              <span className="py-1 rounded-2xl size-fit flex items-center gap-2 text-gray-400"> <FaHome className="text-gray-400" /> Residence</span>
              <span className="py-1 rounded-2xl size-fit flex items-center gap-2 text-gray-400"> <FaStar className=" text-yellow-300" /> 4.5 Review</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold">Overview</h2>
            <div className="bg-white shadow-lg rounded-xl grid grid-cols-3 grid-rows-2 gap-0">
              <div className="gap-3 flex items-center justify-center"><MdKingBed className=" text-gray-400 text-[20px]" /> {property.bedrooms} Bedrooms</div>
              <div className="gap-3 border-l border-gray-300 p-5 flex items-center justify-center"><MdBathtub className=" text-gray-400 text-[20px]" /> {property.bathrooms} Bathrooms</div>
              <div className="gap-3 border-l border-gray-300 p-5 flex items-center justify-center"><MdCarRepair className=" text-gray-400 text-[20px]" /> {property.parking} Car Garage</div>
              <div className="gap-3 border-t border-gray-300 p-5 flex items-center justify-center"><MdBathtub className=" text-gray-400 text-[20px]" /> 7 Bathrooms</div>
              <div className="gap-3 border-t border-l border-gray-300 p-5 flex items-center justify-center"><MdKingBed className=" text-gray-400 text-[20px]" /> 3 Bedrooms</div>
              <div className="gap-3 border-t border-l border-gray-300 p-5 flex items-center justify-center"><MdCarRepair className=" text-gray-400 text-[20px]" /> 1 Car Garage</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold">Description</h2>
            <p className="text-gray-400">{property.description}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold">Address</h2>
            <div className="bg-white shadow-lg rounded-xl grid grid-cols-1 grid-rows-2 gap-0 border-2">
              <div className="gap-3 border-gray-300 flex items-center justify-around p-5 "><span>City:</span> <span>Lekki</span></div>
              <div className="gap-3 border-t border-gray-300 p-5 flex items-center justify-around "><span>State:</span> <span>Lagos</span></div>
              <div className="gap-3 border-t border-gray-300 p-5 flex items-center justify-around "><span>Country:</span> <span>Nigeria</span></div>

            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold">Detials</h2>
            <div className="bg-white shadow-lg rounded-xl grid grid-cols-2 grid-rows-2 gap-0 border-2">
              <div className="gap-3 border-r border-b border-gray-300 flex items-center justify-around"><span>Property ID:</span> <span>Lekki</span></div>
              <div className="gap-3 border-b border-gray-300 p-5 flex items-center justify-around"><span>Bedroom: </span> <span>11</span></div>
              <div className="gap-3 border-r border-gray-300 p-5 flex items-center justify-around"><span>Price:</span> <span>$2,093,234</span></div>
              <div className="gap-3   border-gray-300 p-5 flex items-center justify-around"><span>Bathrooms: </span> <span>12</span></div>
              <div className="gap-3 border-t border-r border-gray-300 p-5 flex items-center justify-around"><span>Property Size: </span> <span>Lekki</span></div>
              <div className="gap-3 border-t  border-gray-300 p-5 flex items-center justify-around"><span>Year Built:</span> <span>2016</span></div>
              <div className="gap-3 border-t border-r border-gray-300 p-5 flex items-center justify-around"><span>Land Area: </span> <span>2000</span></div>
              <div className="gap-3 border-t  border-gray-300 p-5 flex items-center justify-center"><span>Property Type</span> <span>Residence</span></div>
            </div>
          </div>
        </div>
      </div>
      <hr className="font-extrabold h-[2px] bg-gray-300" />
      {/* <div className="h-[500px]"></div> */}
    </div>
  );
};

export default SingleProperty;