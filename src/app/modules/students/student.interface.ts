import { Model, Types } from 'mongoose';
import { Schema, model, connect } from 'mongoose';

 export type TGuardian= {
    fatherName: string;
    fatherOccupation:string;
    fatherContactNo:string;
    motherName: string;
    motherOccupation:string;
    motherContactNo:string;
}

  export type TUserName= {
    
        firstName: string;
        middleName?: string;
        lastName: string; 
  }

  export type TLocalGuardian= {
    name: string;
    occupation:string;
    contactNo:string;
    address: string;
  }

export type TStudent= {
    id: string;
    user:Types.ObjectId
    password:string;
    name: TUserName;
    gender: "male" | "female"|"others";
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?:'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress:string;
    guardian:TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string;
   // isActive: 'active' | 'block',
    isDeleted: boolean
  }

     /// for creating statics 

    export interface StudentModel extends Model<TStudent> {
      isUserExists(id:string):Promise<TStudent | null > 
    }


    /// for creating instance

//  export type StudentMethods={
//     isUserExists(id:string):Promise<TStudent | null >
//   }

 //export   type StudentModels= Model<TStudent, Record<string , never > , StudentMethods>