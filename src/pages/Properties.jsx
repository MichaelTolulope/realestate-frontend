import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import PropertyCard from "../components/PropertyTile";
import PropertyTileLoading from "../components/PropertyTileLoading";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import { getAllProperties, getAllPropertiesFiltered } from "../apiRequests/apiCalls.js";
import { useLocation } from "react-router";
import supabase from "../util/supabase.js";
import { useAuth } from "../context/AuthContext.jsx";
import NotificationBanner from "../components/NotificationBanner.jsx";

const Properties = () => {
  // const [filterDropdown, setFilterDropdown] = useState(false);
  const [search, setSearch] = useState();
  const [type, setType] = useState();
  const [city, setCity] = useState();
  const [price, setPrice] = useState();
  const [filters, setFilters] = useState();
  const [returnedProperties, setReturnedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth()


  const location = useLocation()

  useEffect(() => {
    // Check if location.state exists and is an object
    if (location.state) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...location.state, // Merge the filters from location.state
      }));
    }
  }, [location.state]);


  const fetchProperties = async () => {
    setIsLoading(true);

    let query = supabase.from('listing').select();

    if (!user) {
      query = query.eq('active', true); // Only show active listings if no user
    }

    const { data, error } = await query;

    setIsLoading(false);

    if (error) {
      console.error('Error fetching properties:', error);
      return;
    }

    setReturnedProperties(data);
  };



  useEffect(() => {
    fetchProperties()
  }, [])

  // Update filters dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="box-border">
      <div className="px-3 md:px-8">
        <form className="flex justify-between gap-16 w-full mx-auto py-7 border-b-2 sm:flex-col md:flex-col lg:flex-row ">
          <div className="lg:w-[70%] gap-4 container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="search">Looking For?</label>
              <input
                type="text"
                placeholder="What to look for?"
                name="search"
                className="border px-2 py-3 w-full rounded-xl"
                value={search}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                className="border px-2 py-3 w-full rounded-xl"
                value={type}
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
                value={price}
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
                value={city}
                onChange={handleInputChange}
              >
                <option value="">All Cities</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
              </select>
            </div>
          </div>
        </form>

        <div>
          <h2 className="text-3xl font-semibold my-8 ">
            All Our Property Listings
          </h2>
        </div>
        {
          user && <NotificationBanner bgColor="bg-blue-50" textColor="text-blue-600" text="Note: To edit click on the property!"/>
        }

        {/* Properties */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 place-items-center">
          {isLoading
            ? [1, 2, 3, 4].map((_, index) => (
              <PropertyTileLoading key={index} />
            ))
            : returnedProperties?.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Properties;
