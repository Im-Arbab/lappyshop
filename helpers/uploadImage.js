const uploadImage = async(file)=>{

const data = new FormData()

data.append("file",file)
data.append("upload_preset","mern_upload")

const res = await fetch(
"https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
{
method:"POST",
body:data
}
)

const result = await res.json()

return result
}

export default uploadImage