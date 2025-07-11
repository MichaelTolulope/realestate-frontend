import { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { MdCancel, MdClose, MdFrontLoader, MdOutlineFileUpload } from "react-icons/md";
import { toast } from 'sonner';
import { createNewProperty } from '../apiRequests/apiCalls';
import { useNavigate } from 'react-router';
import { AnimationWrapper } from '../App';
import supabase from '../util/supabase';

// eslint-disable-next-line react/prop-types
const AddProperty = ({ show }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState()

    const [step, setStep] = useState(1)
    const [propertyImages, setPropertyImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [ammenity, setAmmenity] = useState('')
    const [tag, setTag] = useState('')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [price, setPrice] = useState('')
    const [ammenities, setAmmenities] = useState([])
    const [tags, setTags] = useState([])
    const [location, setLocation] = useState('')
    const [bathroom, setBathroom] = useState('')
    const [bedroom, setBedroom] = useState('')
    const [area, setArea] = useState('')
    const [parking, setParking] = useState('')
    const [showForm, setShowForm] = useState(true)

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])

    // 📸 Handle property image preview
    const handlePropertyImageInput = (e) => {
        const files = Array.from(e.target.files);
        setPropertyImages(files);
        setImagesPreview(files.map(file => URL.createObjectURL(file)));
    };

    const handleAddAmmenity = () => {
        if (ammenity.trim()) {
            setAmmenities([...ammenities, ammenity.trim()])
            setAmmenity('')
        }
    }

    const handleAddTag = () => {
        if (tag.trim()) {
            setTags([...tags, tag.trim()])
            setTag('')
        }
    }

    // ✅ Upload images to Cloudinary
    const uploadImagesToCloudinary = async (images) => {
        const uploadedImageURLs = [];

        for (const image of images) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "realEstate_upload_preset");
            formData.append("folder", "realestate_property_images");

            const res = await fetch("https://api.cloudinary.com/v1_1/dl3kjft6t/image/upload", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (res.ok) {
                uploadedImageURLs.push(data.secure_url);
            } else {
                throw new Error(data.error?.message || "Failed to upload image");
            }
        }

        return uploadedImageURLs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        setStep('creating')

        toast.promise(propertyPromise(), {
            loading: "Uploading property...",
            success: (data) => {
                setShowForm(false)
                return data.message
            },
            error: (err) => err.message || "An error occurred",
        });
    }

    const propertyPromise = async () => {
        try {
            // 1. Upload to Cloudinary
            const imageURLs = await uploadImagesToCloudinary(propertyImages);

            // 2. Insert into Supabase
            const { data, error } = await supabase
                .from("listing")
                .insert([{
                    name: title,
                    description,
                    type: status,
                    price,
                    images: imageURLs,
                    "land-area": area,
                    bathrooms: bathroom,
                    bedrooms: bedroom,
                    ammenities,
                    address: location,
                    tags,
                    createdBy: user?._id,
                    propertyType: type,
                    likes: 0,
                    parking,
                    created_at: new Date().toISOString()
                }])
                .select();

            if (error) throw error;
            return { message: "Property uploaded successfully and awaiting approval!" };

        } catch (err) {
            throw new Error(err.message);
        }
    };

    if (!showForm) return null;


    return (

        <div className='px-5 py-5 md:px-36 flex flex-col  bg-[rgba(0,0,0,0.5)] justify-center items-center fixed inset-0 z-20 h-full ' onClick={() => show(false)}>

            <form action="" onSubmit={e => handleSubmit(e)} className='z-10 w-[100%]' onClick={(e) => e.stopPropagation()}>

                {
                    step === 1
                    &&
                    (
                        <AnimationWrapper className="w-[100%]">

                            <div className='p-8 rounded-lg shadow-md flex flex-col gap-8 bg-white min-h-[500px] w-[100%] md:w-[700px]'>
                                <MdClose className='block md:hidden text-[32px] self-end'  onClick={() => show(false)} />
                                <h2 className='font-bold text-xl'>Add a new property</h2>
                                <div className="grid w-full items-center gap-1.5">
                                    <label htmlFor="sellingPrice" className='text-slate-500'>Property Name</label>
                                    <input onChange={(e) => setTitle(e.target.value)} value={title} className='border p-3 rounded-xl' name='price' type="text" id="location" placeholder="location of property" />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label htmlFor="sellingPrice" className='text-slate-500'>Location</label>
                                    <input onChange={(e) => setLocation(e.target.value)} value={location} className='border p-3 rounded-xl' name='price' type="text" id="location" placeholder="location of property" />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label htmlFor="sellingPrice" className='text-slate-500'>Upload property images</label>
                                    <div className='flex flex-col justify-center items-center w-full h-[150px] md:h-[230px] border-2 border-gray-600 rounded-2xl bg-gray-200 border-dashed cursor-pointer' onClick={
                                        () => {
                                            document.querySelector('.file-input').click()
                                        }
                                    }>
                                        <input className='border p-3 rounded-xl hidden file-input' accept='image/*' name='file' multiple type="file" id="property-images" placeholder="location of property" onChange={
                                            // setImages(e.target.value)
                                            handlePropertyImageInput
                                        } />


                                        {
                                            imagesPreview.length > 0 ?
                                                <div className='flex items-center w-[80%] gap-5'>
                                                    <h2 className='font-bold text-md w-[40%]'>Selected files:</h2>
                                                    <div className='flex gap-2 flex-wrap'>
                                                        {imagesPreview.map(image => (
                                                            <img key={image} src={image} alt="" className='w-[60px] h-[60px] rounded-md' />
                                                        ))}
                                                    </div>

                                                </div>
                                                :
                                                <>
                                                    < MdOutlineFileUpload className='text-gray-600 text-[40px]' />
                                                    <p>Browse files to upload</p>
                                                </>
                                        }
                                    </div>
                                </div>

                                <div className='flex gap-7 justify-end'>
                                    <button type='button' className='flex items-center justify-center gap-4 text-white bg-black  py-3 px-10 rounded-2xl group' onClick={() => {
                                        if (!location || !propertyImages) {
                                            toast.warning("Please fill all fields!")
                                            // return;
                                        }
                                        else {
                                            setStep(step + 1)
                                        }

                                    }}>Next <FaArrowRightLong className='group-hover:translate-x-2 transition-transform' /></button>

                                </div>
                            </div>
                        </AnimationWrapper>
                    )
                }
                {
                    step === 2
                    &&

                    (
                        <AnimationWrapper>
                            <div className='p-8 rounded-lg shadow-md flex flex-col gap-8 bg-white min-h-[500px] min-w-[700px]'>
                                <h2 className='font-bold text-xl'>Enter some more details about your listing</h2>

                                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='text-lg text-slate-500'>Rent or Sale</h1>

                                        <div className="flex items-center space-x-2">
                                            <input type='radio' name='type' value="For Rent" id="Rent" onChange={() => {
                                                setStatus('For Rent')
                                            }} />
                                            <label htmlFor="Rent">Rent</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type='radio' name='type' value="For Sale" id="Sell" onChange={() => {
                                                setStatus('For Sale')
                                            }} />
                                            <label htmlFor="Sell">Sell</label>
                                        </div>

                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='text-lg text-slate-500'>Property Type</h1>
                                        <select
                                            className='border p-3 rounded-xl'
                                            name='propertyType'
                                            onChange={e => setType(e.target.value)}

                                        >

                                            <option value={''} disabled selected>Select Property Type</option>
                                            <option value="Single Family House">Single Family House</option>
                                            <option value="Town House">Town House</option>
                                            <option value="Condo">Condo</option>
                                        </select>

                                    </div>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                                    <div className="grid w-full items-center gap-1.5">
                                        <label htmlFor="Bedroom" className='text-slate-500'>Bedroom</label>
                                        <input onChange={e => setBedroom(e.target.value)} value={bedroom} className='border p-3 rounded-xl' name='bedroom' type="number" id="Bedroom" placeholder="Ex:2" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <label htmlFor="Bathroom" className='text-slate-500'>Bathroom</label>
                                        <input onChange={e => setBathroom(e.target.value)} value={bathroom} className='border p-3 rounded-xl' name='bathroom' type="number" id="Bathroom" placeholder="Ex:2" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <label htmlFor="Parking" className='text-slate-500'>Parking</label>
                                        <input onChange={e => setParking(e.target.value)} value={parking} className='border p-3 rounded-xl' name='parking' type="number" id="Parking" placeholder="Ex:2" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <label htmlFor="Area" className='text-slate-500'>Area (Sq.Ft)</label>
                                        <input onChange={e => setArea(e.target.value)} value={area} className='border p-3 rounded-xl' name='area' type="number" id="Area" placeholder="Ex:1900" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <label htmlFor="sellingPrice" className='text-slate-500'>Selling Price ($)</label>
                                        <input onChange={e => setPrice(e.target.value)} value={price} className='border p-3 rounded-xl' name='price' type="number" id="sellingPrice" placeholder="4000000" />
                                    </div>

                                </div>
                                <div className='grid grid-cols-1 gap-10'>
                                    <div className="grid w-full gap-1.5">
                                        <label htmlFor="description text-slate-500">Description</label>
                                        <textarea onChange={e => setDescription(e.target.value)} value={description} name='description' placeholder="" id="description" className='border p-3 rounded-xl' />
                                    </div>
                                </div>
                                <div className='flex gap-7 justify-between'>
                                    <button className='flex items-center justify-center gap-4 text-white bg-black  py-3 px-10 rounded-2xl group' onClick={() => setStep(step - 1)} ><FaArrowLeftLong className='group-hover:-translate-x-2 transition-transform' />Back</button>
                                    <button type='button' className='flex items-center justify-center gap-4 text-white bg-black  py-3 px-10 rounded-2xl group' onClick={
                                        () => {
                                            if (!description || !status || !type || !bathroom || !bedroom || !area || !parking || !status) {
                                                toast.warning("Please fill in all fields!")
                                            }
                                            else {
                                                setStep(step + 1)
                                            }
                                        }

                                    }>Next <FaArrowRightLong className='group-hover:translate-x-2 transition-transform' /> </button>

                                </div>
                            </div>
                        </AnimationWrapper>
                    )
                }

                {
                    step === 3
                    &&
                    (
                        <AnimationWrapper>
                            <div className='p-8 rounded-lg shadow-md flex flex-col gap-8 justify-between bg-white min-h-[500px] min-w-[700px]'>
                                <div className=' flex flex-col gap-8'>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label htmlFor="Bedroom" className='text-slate-500'>Ammenities</label>
                                        <div className='flex w-full gap-3'>
                                            <input className='border p-3 rounded-xl flex-1' name='ammenities' type="ammenities" id="ammenities" placeholder="Ex: swimming pool" value={ammenity} onChange={
                                                e => {
                                                    setAmmenity(e.target.value)
                                                }

                                            } />
                                            <button type='button' className='bg-black rounded-2xl py-3 px-5 text-white' onClick={handleAddAmmenity}>Add Ammenity</button>
                                        </div>
                                        <div className="flex gap-4 text-sm text-gray-600 mt-3 w-full">
                                            {
                                                ammenities.map(ammenity => (
                                                    <span className="bg-gray-100 py-1 px-3 rounded-2xl flex gap-2 items-center">{ammenity}<MdCancel className='cursor-pointer' onClick={() => {
                                                        setAmmenities(ammenities.filter(i => i != ammenity))
                                                    }} /></span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label htmlFor="Bedroom" className='text-slate-500'>Search Tags</label>
                                        <div className='flex w-full gap-3'>
                                            <input className='border p-3 rounded-xl flex-1' name='tags' type="tags" id="tags" placeholder="Ex: luxurious, cheap" value={tag} onChange={
                                                e => {
                                                    setTag(e.target.value)
                                                }

                                            } />
                                            <button type='button' className='bg-black rounded-2xl py-3 px-5 text-white' onClick={handleAddTag}>Add Tag</button>
                                        </div>
                                        <div className="flex gap-4 text-sm text-gray-600 mt-3 w-full">
                                            {
                                                tags.map(tag => (
                                                    <span className="bg-gray-100 py-1 px-3 rounded-2xl flex gap-2 items-center">{tag}<MdCancel className='cursor-pointer' onClick={() => {
                                                        setTags(tags.filter(i => i != tag))
                                                    }} /></span>
                                                ))
                                            }
                                        </div>
                                    </div>

                                </div>
                                <div className='flex gap-7 justify-between justify-self-end h-full'>
                                    <button className='w-fit h-fit flex items-center justify-center gap-4 text-white bg-black  py-3 px-10 rounded-2xl group' onClick={() => setStep(step - 1)} ><FaArrowLeftLong className='group-hover:-translate-x-2 transition-transform' />Back</button>
                                    {type == 'rent' ? <button className='w-fit h-fit flex items-center justify-center gap-4 text-white bg-black  py-3 px-10 rounded-2xl group' onClick={() => setStep(step + 1)} >Next<FaArrowRightLong className='group-hover:translate-x-2 transition-transform' /></button>
                                        : <button type='submit' className='w-fit h-fit text-white bg-black  py-3 px-10 rounded-2xl' >Save</button>}

                                </div>
                            </div>
                        </AnimationWrapper>

                    )


                }
                {
                    type == 'rent' && step === 4 && (
                        <AnimationWrapper>
                            <div className='p-8 rounded-lg shadow-md flex flex-col gap-8 bg-white min-h-[500px] w-[700px] relative'>
                                <div className="grid w-full items-center gap-1.5">
                                    <label htmlFor="Bedroom" className='text-slate-500'>Rent Price per month</label>
                                    <input className='border p-3 rounded-xl ' name='rent-price' type="number" id="rent-price" placeholder="200000" />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label htmlFor="Bedroom" className='text-slate-500'>Initial Deposite</label>
                                    <input className='border p-3 rounded-xl ' name='deposit' type="number" id="deposite" placeholder="200000" />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label htmlFor="Bedroom" className='text-slate-500'>Lease Duration</label>
                                    <input className='border p-3 rounded-xl' name='duration' type="text" id="duration" placeholder="Ex: 2 months" />
                                </div>
                                <div className='flex gap-7 justify-between'>
                                    <button className=' flex items-center justify-center gap-4 text-white bg-black  py-3 px-10 rounded-2xl group' onClick={() => setStep(step - 1)} ><FaArrowLeftLong className='group-hover:-translate-x-2 transition-transform' />Back</button>
                                    <button type='submit' className='text-white bg-black  py-3 px-10 rounded-2xl' >Save</button>

                                </div>
                                {
                                    step == 'creating' && (
                                        <div className='inset-0 bg-black opacity-15 absolute'>

                                            <MdFrontLoader />
                                        </div>
                                    )
                                }
                            </div>
                        </AnimationWrapper>

                    )
                }



            </form>
        </div>

    )
}

export default AddProperty