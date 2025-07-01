import React, { useEffect, useState } from 'react'
import { getAllProperties, getAllPropertiesPaginated } from '../apiRequests/apiCalls';
import PropertyCard from './PropertyTile';
import { Link, Links } from 'react-router';
import { FaArrowRightLong } from 'react-icons/fa6';
import PropertyTileLoading from './PropertyTileLoading';
import supabase from '../util/supabase';

const DiscoverProperties = () => {


    const [properties, setProperties] = useState([])
    const [isLoading, setIsLoading] = useState([])

    useEffect(() => {
        const fetchProperties = async () => {
            setIsLoading(true)
            const { data, error } = await supabase
                .from('listing')
                .select()
            setIsLoading(false)
            setProperties(data)

        };

        fetchProperties();
    }, []);
    return (
        <div className='px-3 md:px-8'>
            <h2 className="text-4xl font-semibold my-8 ">
                Discover Our Property Listings
            </h2>
            {/* Properties */}
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 place-items-center'>
                {/* Render Property Cards */}
                {
                    isLoading
                        ? [1, 2, 3, 4].map((_, index) => (
                            <PropertyTileLoading key={index} />
                        ))
                        : Array.isArray(properties) ? (
                            properties.map((property, index) => (
                                <PropertyCard key={index} property={property} />
                            ))
                        ) : (
                            <p>No properties found</p> // Fallback for non-array data
                        )}

            </div>
            <div className='w-full flex justify-end'>
                <Link to={'/properties'} className='underline flex gap-1 items-end group '>See more<FaArrowRightLong className='group-hover:translate-x-2 transition-transform' /></Link>
            </div>
        </div>
    )
}

export default DiscoverProperties