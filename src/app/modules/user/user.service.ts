import config from "../../config";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { NewUser, TUser } from "./user.interface";
import { User } from "./user.model";


const createStudentToDB = async ( password:string,  studentData:TStudent)=> {
   
   // crate a user object
    const userData: Partial<TUser>  ={}

    // if password is not given, use default password
       userData.password=password || config.default_pass as string

    // if(!password){
    //    user.password=config.default_pass as string;
    // }
    // else{
    //     user.password=password;
    // }

    // set student role
     userData.role='student'

     // set manually generated id
    userData.id='203010001'

     // create user
    const newUser=  await User.create(userData)  // built in static methods

    // create a student
      if(Object.keys(newUser).length){
          // set id, _id as user
          studentData.id=newUser.id;
          studentData.user=newUser._id;  //reference id
       
          const newStudent=await Student.create(studentData)
         return newStudent;

      }
 
    //   const student= new Student(studentData); // create an instance
 
    //   if( await student.isUserExists(studentData.id)){
    //     throw new Error ('user already exist')
    //   }
 
    //  const result= await student.save() //built in instance method
     // return result;
 }

  export const UserServices={
     createStudentToDB
  }