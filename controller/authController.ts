import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";
import crypto from "crypto"
import cloudinary from "../utils/cloudinary";
import jwt from "jsonwebtoken"
import { resetAccountPasswordMail, sendAccountOpeningMail } from "../utils/email";
import { role } from "../utils/role";

const prisma = new PrismaClient();


export const registerUser = async(req:Request, res:Response)=>{
    try {

      const {userName, email, password}= req.body
      
      const salt = await bcrypt.genSalt(10)
      const harsh = await bcrypt.hash(password,salt)

      const value = crypto.randomBytes(16).toString("hex");
      const token = jwt.sign(value, "justRand" )

      const user = await prisma.authModel.create({
        data:{
            userName,
             email, 
             password:harsh,
             token,     
        }
      });

      const tokenID = jwt.sign({id: user.id}, "justRand");
      sendAccountOpenningMail(user, tokenID);

       return res.status(201).json({
        message: " register  user",
        data: user
      })
    } catch (error) {
      return res.status(404).json({
        message: "Error creating user"
      })  
    }
}

export const registerDispatchers = async(req:Request, res:Response)=>{
  try {

    const {userName, email, dispatchID, password}= req.body;

    const salt = await bcrypt.genSalt(10);
    const harsh = await bcrypt.hash(password, salt)

    const value = crypto.randomBytes(16).toString("hex")
    const token = jwt.sign(value, "justRand");

    const findDispatcher = dispatchersData.find((el)=>el.id ==== dispatchID);

    if(findDispatcher){
      const user = await prisma.authModel.create({
        data: {
          userName,
          email,
          password:harsh,
          token,
          role: role.DISPATCHER,
        },
      });

      const tokenID = jwt.sign({id: user.id}, "justRand");
      sendAccountOpeningMail(user, tokenID)

      return res.status(201).json({
        message:"Account created",
        data: user
      });

    }else{
      return res.status(404).json({
        message: "please check ur dispatch ID",
      })
    }

  } catch (error) {
    return res.status(404).json({
      message: "can't sign u as one of my dispatchers"
      
    })
  }
}

export const readUsers = async(req:Request, res:Response)=>{
    try {

      const user = await prisma.authModel.findMany({})
      return res.status(200).json({
        message: "read users",
        data:user
      })
    } catch (error) {
      return res.status(404).json({
        message: "Error reading users"
      })  
    }
}

export const readOneUsers = async(req:Request, res:Response)=>{
    try {
            const {authID} = req.params

      const user = await prisma.authModel.findUnique({
        where:{
            id:authID
        }
      })
      return res.status(200).json({
        message: "read one user",
        data:user
      })
    } catch (error) {
      return res.status(404).json({
        message: "Error reading user"
      })  
    }
}

export const updateAccontInfo = async(req:any, res:Response)=>{
    try {
            const {authID} = req.params
            const {userName} = req.body

      const user = await prisma.authModel.update({
        where:{
            id:authID
        },
        data: {userName},     
      })
      return res.status(201).json({
        message: "updated",
        data:user
      })
    } catch (error) {
      return res.status(404).json({
        message: "Error creating user"
      })  
    }
}

export const updateImage = async(req:any, res:Response)=>{
  try {
          const {authID} = req.params

          const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path)

    const user = await prisma.authModel.update({
      where:{
          id:authID
      },
      data: { avatar:secure_url, avatarID:public_id},
      
    })
    return res.status(201).json({
      message: "updated",
      data:user
    })
  } catch (error) {
    return res.status(404).json({
      message: "Error updating avatar"
    })  
  }
}

export const deleteAccount = async(req:Request, res:Response)=>{
    try {
            const {authID} = req.params
          
      const user = await prisma.authModel.delete({
        where:{
            id:authID
        }
      })
      return res.status(200).json({
        message: "read one user",
        data:user
      })
    } catch (error) {
      return res.status(404).json({
        message: "Error creating user"
      })  
    }
}

export const signInUser = async(req:Request, res:Response)=>{
    try {

      const {email,password}= req.body
      
  const user = await prisma.authModel.findUnique({
    where:{email}
  });

  if(user) {
    const check = await bcrypt.compare(password, user.password)
    if(check){
        if(user.verified && user.token !== "") {

          const token = jwt.sign(
            {
              id: user.id,
            },
            "secret",
            {expiresIn: "3d"}
          );

            return res.status(201).json({
                message:`welcome back ${user.userName}`,
                data: user.id,
            })
        }else{
            return res.status(404).json({
                message: "incorrect password"
            })
        }
    }
  }
    } catch (error) {
      return res.status(404).json({
        message: "Error creating user"
      })  
    }
}

export const verifiedUser = async(req:Request, res:Response)=>{
    try {

      const {token}= req.params;
     

      const getID:any = jwt.verified(token, "justRand", (err, payload:any)=>{
        if(err){
          return err;
        }else{
          return payload.id;
        }
      })

  const user = await prisma.authModel.update({
    where:{id: getID},
    data: {
      verified: true,
    token: "",
},
  });

       return res.status(201).json({
        message: " account  verified",
        data: user
      })
    } catch (error) {
      return res.status(404).json({
        message: "Error creating user"
      })  
    }
}

export const resetUser = async(req:Request, res:Response)=>{
    try {

      const {email} = req.body;

  const user = await prisma.authModel.findUnique({
    where:{email},
  
  });
  if (user?.verified && user.token === "") {
    const value = crypto.randomBytes(16).toString("hex");
    const token = jwt.sign(value, "justRand");

    await prisma.authModel.update({
      where:{id: user.id},
      data: {
        token,
      }
    })

    resetAccountPasswordMail(user, token)
  }
 
       return res.status(201).json({
        message: " password  changed",
        data: user
      })
    } catch (error) {
      return res.status(404).json({
        message: "Error creating user"
      })  
    }
}

export const changePasswordUser = async(req:Request, res:Response)=>{
    try {

      const {userID}= req.params
      const {token}= req.params
      const {password} = req.body
      
      const getID:any = jwt.verified(token, "justRand", (err, payload:any)=>{
        if(err){
          return err;
        }else{
          return payload.id;
        }
      })
  const user = await prisma.authModel.findUnique({
    where:{id:getID}

  });

  if(user?.verified && user.token !== ""){
    const salt = await bcrypt.genSalt(10);
    const harsh = await bcrypt.hash(password,salt);
    await prisma.authModel.update({
        data:{password: harsh},
        where:{id: userID}
    });
    return res.status(201).json({
      message: " password  changed",
      data: user
    })
  }else{
    return res.status(404).json({
      message: "can't reset this password",
    });
  }
       
    } catch (error) {
      return res.status(404).json({
        message: "Error creating user"
      })  
    }
}