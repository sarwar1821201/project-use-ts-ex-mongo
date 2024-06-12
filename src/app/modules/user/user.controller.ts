import { NextFunction, Request, Response } from "express";
import {  UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';


const createStudent = async(req:Request, res:Response, next:NextFunction )=> {
    try{
 
     //create schema validation using zod
    
        const {  password, student: studentData } = req.body;

        // data validation using joi
      //const{error,value}=studentValidationSchema.validate(studentData)
     
     //console.log(value,error)
     //const result= await StudentServices.createStudentToDB(value)

       // data validation using zod

      // const zodParseData= studentZodValidationSchema.parse(studentData)

     const result= await UserServices.createStudentToDB(password,studentData)

    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: "Something is wrong",
    //     error: error,
    //   })
    // }

//    res.status(200).json({
//      success: true,
//      message: "Student is created successfully",
//      data: result,
//    })

     sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"student create successfully",
        data:result
     })

    } catch(err){
    //   res.status(500).json({
    //     success: false,
    //     message: err.message || "Something is wrong",
    //     error: err,
    //   })
      next(err)
    }
}

export const UserControllers={
    createStudent
}