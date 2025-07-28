import * as yup from 'yup';

const emailSchema= yup.string().trim().email().required("")
const passwordSchema = yup.string().trim().min(5).required("")

export const loginValidationSchema = yup.object().shape({
    email:emailSchema,
    password:passwordSchema
})
export const registerValidationSchema = yup.object().shape({
    name:yup.string().trim().min(3).max(50).required(""),
    email:emailSchema,
    password:passwordSchema
})