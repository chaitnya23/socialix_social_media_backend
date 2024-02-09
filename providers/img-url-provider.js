 const getImgUrlFromCloudinary = async(file)=>{
    try {

        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dkvpwutkh/image/upload",
            data
        );
        return res.data.url;
    } catch (error) {
        throw new Error("error in uploading image on cloudinary");
    }
}
  
module.exports =  getImgUrlFromCloudinary;