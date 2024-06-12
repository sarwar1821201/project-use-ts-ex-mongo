import {   StudentModel,   TGuardian, TLocalGuardian, TStudent, TUserName,  } from './student.interface';
 //StudentMethods, StudentModels,
import { Model } from 'mongoose';
import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import { string } from 'zod';
import bcrypt from 'bcrypt'
import config from '../../config';

  const userNameSchema= new Schema<TUserName>({
    firstName: {
        type:String,
        required:[true, 'First Name is Required'],
        trim:true,
        maxlength:[20, 'First name length can not be more than 20'],
        validate: {
          validator: function(value:string){
            const firstNameStr=value.charAt(0).toUpperCase()+ value.slice(1);
            return firstNameStr===value
            console.log(value)
          },
          message:'{VALUE} is not capitalize format'
        }
    },
    middleName:{
        type:String,
        
    },
    lastName:{
        type:String,
         required:[true, 'Last Name is Required'],
         validate:{
          validator: (value:string)=> validator.isAlpha(value),
          message:'{VALUE} is not valid '
         }
    }
  })

  const guardianSchema= new Schema<TGuardian>({
    fatherName:{type:String,required:true},
    fatherOccupation:{type:String,required:true},
    fatherContactNo:{type:String,required:true},
    motherName:{type:String,required:true},
    motherOccupation:{type:String,required:true},
    motherContactNo:{type:String,required:true},

  })

  const localGuardianSchema= new Schema<TLocalGuardian>({
    name:{type:String,required:true},
    occupation:{type:String,required:true},
    contactNo:{type:String,required:true},
    address:{type:String,required:true},
  })


 const studentSchema= new Schema<TStudent, StudentModel >({

      id:{type:String, required:true, unique:true },
      user:{type:Schema.Types.ObjectId, 
        required:[true, 'user id is requires'],
        unique:true,
        ref:'User'
       },
      // password: {type:String,
      // required:[true, 'password is Required'],
      // trim:true,
      // maxlength:[20, 'password can not be more than 20'], } ,
      name:{
        type:userNameSchema,
        required:true,
       
      },
      gender:{
        type:String,
        enum:{
          values:["male","female","others"],
          message:"{VALUE} is not valid "
        },
        required:true
      },
      dateOfBirth: {type:String},
      email:{type:String, required:true, unique:true ,
        validate:{
          validator: (value:string)=> validator.isEmail(value),
          message:'{VALUE} is not valid email '
         }

      },
      contactNo:{type:String,required:true},
      emergencyContactNo:{type:String,required:true},
      bloodGroup:{
        type:String,
        enum:[ 'A+','A-','B+','B-','AB+','AB-', 'O+', 'O-' ]
      },
      presentAddress:{type:String,required:true},
      permanentAddress:{type:String,required:true},
      guardian:{
        type:guardianSchema,
        required:true
      },
      localGuardian:{
        type:localGuardianSchema,
        required:true
      },
      profileImg:{type:String},
      // isActive:{
      //   type:String,
      //   enum:['active', 'block'],
      //   default:'active'
      // },
      isDeleted:{
        type: Boolean,
        default:false
      }
 }, {
       toJSON:{
        virtuals:true
       }
 }  )

    //// virtual

    studentSchema.virtual('fullName').get(function (){
      return (`${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName} `);
    } )

  //  // pre save middleware : will work on create(), save()
  //  studentSchema.pre('save', async function(next){
  //      //console.log(this, 'pre hook: we will save the data' )
  //   const user=this;
  //     //hashing password and save into db
  //  user.password=await  bcrypt.hash(user.password,Number(config.bcrypt_salt_round) );
  //  next()

  //  } )

  // // post save middleware hook
  // studentSchema.post('save', function(doc,next){
  //   doc.password=''
  //     // console.log(this, 'post hook: we  saved our data' );
  //     next()
  // } )

    // query middleware
    
   studentSchema.pre('find', function(next) {
      // console.log(this)

     this.find({isDeleted : {$ne:true}  })

      next()
   } )


   studentSchema.pre('findOne', function(next) {
    // console.log(this)

   this.find({isDeleted : {$ne:true}  })

    next()
 } )


 studentSchema.pre('aggregate', function(next) {
  // console.log(this)
 //this.find({isDeleted : {$ne:true}  })
  this.pipeline().unshift({$match:{isDeleted: {$ne:true} }})
  next()
} )


    /// creating a custom static method
    studentSchema.statics.isUserExists= async function(id:string){
       const existingUser= await Student.findOne({id})
       console.log(existingUser)
       return existingUser
    }



 // create a custom instance method
  // studentSchema.methods.isUserExists= async function (id:string){
  //    const existingUser= await Student.findOne({id})
  //    return existingUser
  // }

  

 // user model

//  export const Student= model<TStudent,StudentModels  >('Student', studentSchema);

export const Student= model<TStudent,StudentModel >('Student', studentSchema);

 