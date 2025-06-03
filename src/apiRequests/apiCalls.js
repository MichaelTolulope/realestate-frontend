const baseUrl = import.meta.env.VITE_API_BASE_URL

export const createNewProperty=async(formData)=>{
    return await fetch(`${baseUrl}/property/create-new`,{
        method:'POST',
        // headers:{
        //     'Content-Type':'multipart/form-data'
        // },
        body:formData
        
    })
}

export const getAllProperties = async ()=>{
    try {
        const response = await fetch(`${baseUrl}/property/all`)
        if(!response.ok){
            throw new Error("Failed to fetch properties")
        }
        return await response.json()
        
    } catch (error) {
        console.log("Failed to fetch properties: ", error);
        return []
        
        
    }

}
export const getAllPropertiesFiltered = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString(); // Converts filters into query string
    const response = await fetch(`${baseUrl}/property/all?${params}`);
    return response.json();
  };



export const getAllPropertiesPaginated = async (page,limit)=>{
    try {
        const response = await fetch(`${baseUrl}/property/all${(limit && page) && `/?limit=${limit}/?page=${page}`}`)
        if(!response.ok){
            throw new Error("Failed to fetch properties")
        }
        return await response.json()
        
    } catch (error) {
        console.log("Failed to fetch properties: ", error);
        return []
        
        
    }

}
export const getSingleProperty = async (id)=>{
    try {
        const response = await fetch(`${baseUrl}/property/${id}`)
        if(!response.ok){
            throw new Error("Failed to fetch properties")
        }
        return await response.json()
        
    } catch (error) {
        console.log("Failed to fetch properties: ", error);
        return null
        
        
    }
}
export const getAllRequests = async ()=>{
    try {
        const response = await fetch(`${baseUrl}/user-requests/all`)
        if(!response.ok){
            throw new Error("Failed to fetch user requests")
        }
        return await response.json()
        
    } catch (error) {
        console.log("Failed to fetch user requests: ", error);
        return null
        
        
    }
}

export const sendUserRequest = async (request)=>{
    try {
        const response = await fetch(`${baseUrl}/user-requests/send-request`,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify(request)
        })
        return response;

    } catch (error) {
        console.log(error);
        
    }
}
    

// {
//     "title":"Luxury Condo Lekki",
//     "description":"Beautiful condo apartment situated in the heart of lekki, lagos state.",
//     "status":"For Sale",
//     "price":6500000,
//     "features": {
//         "bathrooms": 3,
//         "bedrooms":4,
//         "area": 2000
//     },
//     "ammenities":["swimming pool", "football field"],
//     "location":"Admiralty way, Lekki, Lagos.",
//     "tags":["luxery", "lagos"],
//     "publisher":"675b3062d5ceb7d89a776651"


// }