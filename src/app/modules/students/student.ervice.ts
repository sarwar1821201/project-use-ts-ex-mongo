import {  TStudent } from "./student.interface"
import { Student } from "./student.model"


// const createStudentToDB = async (studentData:TStudent)=> {
//    console.log(studentData.id)
//    if(await Student.isUserExists (studentData.id) ){
//       throw new Error ('user already exist')
// }
    
//    const result=  await Student.create(studentData)  // built in static methods

//    //   const student= new Student(studentData); // create an instance

//    //   if( await student.isUserExists(studentData.id)){
//    //     throw new Error ('user already exist')
//    //   }

//    //  const result= await student.save() //built in instance method
//      return result;
// }

  const getAllStudentsFromDB = async() => {
     const result= await Student.find();
     return result;
  }

  const getSingleStudentFromDB = async(id:string) => {
   // const result= await Student.findOne({id});
   
    const result= await  Student.aggregate([
      {$match: {id:id} }
    ])
    return result;
 }

 const deleteSingleStudentFromDB = async(id:string) => {
   const result= await Student.updateOne({id}, {isDeleted:true}  );
   return result;
}

export const StudentServices= {
   // createStudentToDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteSingleStudentFromDB
}