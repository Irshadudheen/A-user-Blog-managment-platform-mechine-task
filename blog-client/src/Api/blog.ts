import Api from "../service/axios";

export const postBlog = async(data:any)=>{
    try {
        const response = await Api.post('/api/blog/create',data)
        return response.data
    } catch (error) {
        throw error
    }
}
export const getAllBlog = async()=>{
    try {
        const response = await Api.get('/api/blog/all')
        return response.data
    } catch (error) {
        throw error
    }
}
export const getBlogbyId= async(blogId:any)=>{
    try {
        const response = await Api.get(`/api/blog/${blogId}`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const updateBlogById = async (blogData:any,blogId)=>{
    try {
        const response = await Api.put(`/api/blog/${blogId}`,blogData)
        return response.data
    } catch (error) {
        throw error
    }
}
export const deleteBlogById = async(blogId:string)=>{
    try {
        const response = await Api.delete(`/api/blog/${blogId}`)
        return response.data
    } catch (error) {
        throw error
    }
}