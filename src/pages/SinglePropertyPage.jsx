import React, { useEffect, useState } from 'react'
import SingleProperty from '../components/SIngleProperty'
import apartment from '../assets/images/housePic1.jpg'
import Header from '../components/header'
import { useParams } from 'react-router'
import { getSingleProperty } from '../apiRequests/apiCalls'
import Footer from '../components/Footer'

const SinglePropertyPage = () => {

  const [property, setproperty] = useState()

  const { id } = useParams()

 

  useEffect(() => {

    const fetchProperty = async () => {
      const foundProperty = await getSingleProperty(id);
      console.log(foundProperty);
      setproperty(foundProperty.data)
    }
    try {
      fetchProperty()

    } catch (error) {
      console.log(error);

    }
  }, [])
  return (
    <>
     {property && <SingleProperty property={property} />}
     <Footer/>
    </>
  )
}

export default SinglePropertyPage