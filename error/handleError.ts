import {Request, Response, NextFunction} from "express"

import { HTTP, mainError } from "./mainError"

const errorBuilder = (err:mainError, req:Request, res:Response)=>{
    res.status(HTTP.BAD_REQUEST).json({
        name: err.name,
        message: err.message,
        success: err.success,
        status: err.status,
        error: err
    })
}

export const handleError = (err: mainError,
     req:Request,
     res:Response, 
     next:NextFunction,
     )=>{
    errorBuilder(err,req, res)
}