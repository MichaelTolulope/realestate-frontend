import React, { useEffect, useState } from 'react'
import SingleProperty from '../components/SIngleProperty'
import apartment from '../assets/images/housePic1.jpg'
import Header from '../components/Header'
import { useParams } from 'react-router'
import { getSingleProperty } from '../apiRequests/apiCalls'
import Footer from '../components/Footer'
import supabase from '../util/supabase'

const SinglePropertyPage = () => {

  const [property, setproperty] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams()



  useEffect(() => {

    // const fetchProperty = async () => {
    //   const foundProperty = await getSingleProperty(id);
    //   console.log(foundProperty);
    //   setproperty(foundProperty.data)
    // }
    const fetchProperties = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('listing')
        .select('*')
        .eq('id', id)
        .single();
      setIsLoading(false)
      setproperty(data)

    }

    try {
      fetchProperties()

    } catch (error) {
      console.log(error);

    }
  }, [])
  return (
    <>
      {property && <SingleProperty property={property} />}
      <Footer />
    </>
  )
}

export default SinglePropertyPage