import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { sendUserRequest } from '../apiRequests/apiCalls'
import { toast } from 'sonner'

const RequestForm = ({propertyId}) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

        const mutation = useMutation({
          mutationFn: sendUserRequest,
          onSuccess: (data) => {
            if (data && data.ok) {
              toast.success("Request sent successfully!");
              setName('');
              setEmail('');
              setPhone('');
              setMessage('');
            } else {
              toast.error(data?.message || "Request failed!");
            }
          },
          onError: (error) => {
            console.error('Failed to send request:', error);
          },
        });
      
        const handleSubmit = (e) => {
            console.log(name, phone, email, message);
            
            if(!name || !phone || !email || !message){
                toast.warning("All fields are required!")
                return new Error("Al fields are required");
            } 
          e.preventDefault();
          const formData = {
            property:propertyId,
            fullName:name,
            phoneNumber:phone,
            email,
            message
          };
          console.log(formData);
          
          mutation.mutate(formData);
        };


    return (
        <form onSubmit={handleSubmit} className="shadow-lg rounded-2xl w-full flex flex-col bg-white gap-3 p-4">
            <div className="flex justify-between items-center">
                <h3>Aura Homes</h3>
                <a href="/properties"><h4>View Listings</h4></a>
            </div>

            <label htmlFor="name">Name</label>
            <input className="border p-3 rounded-xl" type="text" placeholder="Enter your name" name="name" required value={name} onChange={(e)=>setName(e.target.value)}/>

            <label htmlFor="">Phone</label>
            <input className="border p-3 rounded-xl" type="tel" placeholder="Enter your phone number" required value={phone} onChange={(e)=>setPhone(e.target.value)}/>

            <label htmlFor="">Email</label>
            <input className="border p-3 rounded-xl" type="email" placeholder="Enter your email" required  value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <input className="border p-3 rounded-xl" type="text" placeholder="Hello i'm interested in this property" required value={message} onChange={(e)=>setMessage(e.target.value)}/>

            <input className={`${mutation.isLoading? 'bg-gray-300 ': 'bg-black text-white'} border p-3 rounded-xl cursor-pointer`} disabled={mutation.isLoading} type="submit" value={`${mutation.isLoading ? 'Sending...' : 'Send Request'}`} />
        </form>
    )
}

export default RequestForm