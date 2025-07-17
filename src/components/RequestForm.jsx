import { useState } from 'react'
import { toast } from 'sonner'
import supabase from '../util/supabase'

const RequestForm = ({ propertyId, additionalStyles }) => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)


  const handleSubmit = async (e) => {
    console.log(name, phone, email, message);

    if (!name || !phone || !email || !message) {
      toast.warning("All fields are required!")
      return new Error("Al fields are required");
    }
    e.preventDefault();
    setIsSending(true)

    const { data, error, status } = await supabase
      .from("prospectResponse")
      .insert([{
        propertyId,
        name,
        phone,
        email,
        message
      }]).select()
    setIsSending(false)

    if (error) {
      toast.error("error occured! try again")
      throw error;
    }

    setName("")
    setPhone("")
    setEmail("")
    setMessage("")
    toast.success("Request sent successfully!")


  };


  return (
    <form onSubmit={handleSubmit} className={`shadow-lg rounded-2xl w-full flex flex-col bg-white gap-3 p-4 ${additionalStyles}`}>
      <div className="flex justify-between items-center">
        <h3>Aura Homes</h3>
        <a href="/properties"><h4>View Listings</h4></a>
      </div>

      <label htmlFor="name">Name</label>
      <input className="border p-3 rounded-xl" type="text" placeholder="Enter your name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="">Phone</label>
      <input className="border p-3 rounded-xl" type="tel" placeholder="Enter your phone number" required value={phone} onChange={(e) => setPhone(e.target.value)} />

      <label htmlFor="">Email</label>
      <input className="border p-3 rounded-xl" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />

      <textarea className="border p-3 rounded-xl" cols={24} type="text" placeholder="Hello i'm interested in this property" required value={message} onChange={(e) => setMessage(e.target.value)} />

      <input className={`${'bg-black text-white'} border p-3 rounded-xl cursor-pointer`} disabled={isSending} type="submit" value={`${isSending ? 'Sending request...' : 'Send Request'}`} />
    </form>
  )
}

export default RequestForm