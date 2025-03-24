"use server";
export const handleCreateUser = async (formData) => {
    const data = Object.fromEntries(formData);
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/users`,{
        method : "POST",
        headers: {
            "Content-Type" : "application/json",
            'Accept' : "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseBody  = await response.json();
    console.log(responseBody);

    if(responseBody.success){
        return true;
    }
    return false;
}

export const handleUpdateUser = async (formData) => {
    const {id, ...data} = Object.fromEntries(formData);
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,{
        method : "PATCH",
        headers: {
            "Content-Type" : "application/json",
            'Accept' : "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseBody  = await response.json();
    console.log(responseBody);

    if(responseBody.success){
        return true;
    }
    return false;

    
}