// import {Request, Response} from "express"
// import {PrismaClient} from "@prisma/client"
// import { HTTP } from "../error/mainError"
// import cloudinary from "../utils/cloudinary"

// const prisma = new PrismaClient()

// export const createPost = async(req:any, res:Response) =>{
//     try {
//         const {userID} = req.params;
//         const {title, description, category} = req.body

//         const user = await prisma.authModel.findUnique({
//             where:{id:userID},
//         //    include:{post: true}
//         })
//         const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path)

//     if(user){
//         const post = await prisma.postModel.create({
//             data:{title,
//             description,
//             category,
//             image:secure_url,
//             imageID:public_id,
//             }
//         })
//     }


//     return res.status(201).json({
//         message:"U've just made a post",
//         data:user
//     })
       

//     } catch (error) {
//       return res.status(HTTP.BAD_REQUEST).json({
//         message: "you can't create Post",
//         data: error
//       })
//     }
// }

