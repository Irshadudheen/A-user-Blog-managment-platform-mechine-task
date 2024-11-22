import Api from "../service/axios";
export const uploadImage = async(formData:any)=>{
    try {
        console.log(formData)
        const response = await Api.post('/api/image/upload',formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Specify the content type
            }})
            return response.data
    } catch (error) {
        throw error
    }
}