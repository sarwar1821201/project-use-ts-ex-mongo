import { Request, Response } from "express";
import { StudentServices } from "./student.ervice";


const createStudent = async(req:Request, res:Response)=> {
    try{

        const {student: studentData } = req.body;
const result= await StudentServices.createStudentToDB(studentData)

   res.status(200).json({
     success: true,
     message: "Student is created successfully",
     data: result,
   })

    } catch(err){
        console.log(err)
    }
}

  const getAllStudents= async(req:Request,res:Response) => {
     try{
        const result= await StudentServices.getAllStudentsFromDB()
        res.status(200).json({
            success: true,
            message: "Student are retrieve successfully",
            data: result,
          })

     } catch(err){
        console.log(err)
     }
  }


  const getSingleStudent= async(req:Request,res:Response) => {
    try{
        const {studentId}= req.params

       const result= await StudentServices.getSingleStudentFromDB(studentId)
       res.status(200).json({
           success: true,
           message: "Student is retrieve successfully",
           data: result,
         })

    } catch(err){
       console.log(err)
    }
 }

export const StudentControllers= {
    createStudent,
    getAllStudents,
    getSingleStudent
}