import Joi from 'Joi'

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(20)
      .required()
      .custom((value, helpers) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        if (firstNameStr !== value) {
          return helpers.error('any.invalid', { message: `${value} is not in capitalized format` });
        }
        return value;
      }),
    middleName: Joi.string().allow('', null),
    lastName: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!/^[a-zA-Z]+$/.test(value)) {
          return helpers.error('any.invalid', { message: `${value} is not valid` });
        }
        return value;
      })
      
  });
  
  // Joi schema for Guardian
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  });
  
  // Joi schema for LocalGuardian
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });
  
  // Joi schema for Student
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string()
      .valid('male', 'female', 'others')
      .required(),
    dateOfBirth: Joi.string(),
    email: Joi.string()
      .email()
      .required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().uri(),
    isActive: Joi.string()
      .valid('active', 'block')
      .default('active'),
  });


  export default studentValidationSchema;