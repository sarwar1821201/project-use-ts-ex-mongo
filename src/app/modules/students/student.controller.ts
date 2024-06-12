import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.ervice";
import studentValidationSchema from "./student.validation";
import { z } from "zod";
import studentZodValidationSchema from "./student.zod.validation";
import { nextTick } from "process";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";




// const createStudent = async(req:Request, res:Response)=> {
//     try{

//       /// create schema validation using joi
//      // Joi schema for UserName

        
//      //create schema validation using zod
    

//         const {student: studentData } = req.body;

//         // data validation using joi
//       //const{error,value}=studentValidationSchema.validate(studentData)
     
//      //console.log(value,error)
//      //const result= await StudentServices.createStudentToDB(value)

//        // data validation using zod

//        const zodParseData= studentZodValidationSchema.parse(studentData)

//      const result= await StudentServices.createStudentToDB(zodParseData)

//     // if(error){
//     //   res.status(500).json({
//     //     success: false,
//     //     message: "Something is wrong",
//     //     error: error,
//     //   })
//     // }




//    res.status(200).json({
//      success: true,
//      message: "Student is created successfully",
//      data: result,
//    })

//     } catch(err:any){
//       res.status(500).json({
//         success: false,
//         message: err.message || "Something is wrong",
//         error: err,
//       })
//     }
// }

  const getAllStudents= async(req:Request,res:Response,next:NextFunction) => {
     try{
        const result= await StudentServices.getAllStudentsFromDB()
        res.status(200).json({
            success: true,
            message: "Student are retrieve successfully",
            data: result,
          })

     } catch(err){
      // res.status(500).json({
      //   success: false,
      //   message: err.message || "Something is wrong",
      //   error: err,
      // })
      next(err)

     }
  }


  const getSingleStudent= async(req:Request,res:Response, next:NextFunction ) => {
    try{
        const {studentId}= req.params

       const result= await StudentServices.getSingleStudentFromDB(studentId)

       sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"student is retrieve successfully",
        data:result
     })

      //  res.status(200).json({
      //      success: true,
      //      message: "Student is retrieve successfully",
      //      data: result,
      //    })

    } catch(err){
      // res.status(500).json({
      //   success: false,
      //   message: err.message || "Something is wrong",
      //   error: err,
      // })
      next(err)
    }
 }



 const deleteStudent= async(req:Request,res:Response, next:NextFunction ) => {
  try{
      const {studentId}= req.params

     const result= await StudentServices.deleteSingleStudentFromDB(studentId)
     res.status(200).json({
         success: true,
         message: "Student is deleted successfully",
         data: result,
       })

  } catch(err){
    // res.status(500).json({
    //   success: false,
    //   message: err.message || "Something is wrong",
    //   error: err,
    // })
    next(err)
  }
}

export const StudentControllers= {
   // createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent
}