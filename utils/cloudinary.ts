import {v2 as cloudinary} from "cloudinary"
import env from "dotenv"
env.config();

cloudinary.config({
    cloud_name:process.env.CLOUDNAME!,
    api_Key:process.env.APIkEY!,
    api_secret:process.env. APISECRET,
    secure:true,
})

export default cloudinary
