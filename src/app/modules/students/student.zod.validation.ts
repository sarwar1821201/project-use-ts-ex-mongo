import { z } from "zod";

// Zod schema for UserName
const userNameZodSchema = z.object({
    firstName: z.string()
      .trim()
      .max(20, 'First name length cannot be more than 20')
      .refine((value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      }, {
        message: 'First Name is not in capitalized format'
      }),
    middleName: z.string().optional(),
    lastName: z.string()
      .nonempty('Last Name is Required')
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: 'Last Name is not valid'
      }),
  });
  
  // Zod schema for Guardian
  const guardianZodSchema = z.object({
    fatherName: z.string().nonempty('Father Name is required'),
    fatherOccupation: z.string().nonempty('Father Occupation is required'),
    fatherContactNo: z.string().nonempty('Father Contact No is required'),
    motherName: z.string().nonempty('Mother Name is required'),
    motherOccupation: z.string().nonempty('Mother Occupation is required'),
    motherContactNo: z.string().nonempty('Mother Contact No is required'),
  });
  
  // Zod schema for LocalGuardian
  const localGuardianZodSchema = z.object({
    name: z.string().nonempty('Local Guardian Name is required'),
    occupation: z.string().nonempty('Local Guardian Occupation is required'),
    contactNo: z.string().nonempty('Local Guardian Contact No is required'),
    address: z.string().nonempty('Local Guardian Address is required'),
  });
  
  // Zod schema for Student
  const studentZodValidationSchema = z.object({
    id: z.string(),
    password:z.string().max(20),
    name: userNameZodSchema,
    gender: z.enum(['male', 'female', 'others'], {
      errorMap: () => ({ message: 'Gender is not valid' })
    }),
    dateOfBirth: z.string().optional(),
    email: z.string()
      .email('Email is not valid'),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    guardian: guardianZodSchema,
    localGuardian: localGuardianZodSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'block']).default('active'),
    isDeleted: z.boolean()
  });

  export default studentZodValidationSchema;