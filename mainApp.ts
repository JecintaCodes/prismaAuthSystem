import express, { Application, Request, Response } from "express"
import cors from "cors"


export const mainApp = (app:Application)=>{
  app.use(express.json())
  app.use(cors())
  app.set("view engine", "ejs")
  app.use(express.static("public"))
  app.use(express.static(`${__dirname}/public/css`))


  app.use("/",(req:Request, res:Response)=>{
    try {
      const data = {
        name: "ugochi",
        email:"ugochi@gmail.com",
        url:"https://google.com"
      }
      return res.status(200).render("indexs",data)
    } catch (error) {
      return res.status(404).json({
        message:"u just dey play"
      })
    }
  })
} 