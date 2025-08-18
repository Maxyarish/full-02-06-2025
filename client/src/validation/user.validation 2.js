import * as yup from 'yup';

const emailSchema= yup.string().trim().email()
const passwordSchema = yup.string().trim().min(5)
const nameSchema = yup.string().trim().min(5).max(255)

export const loginValidationSchema = yup.object().shape({
    email:emailSchema.required(),
    password:passwordSchema.required('password is required')
})
export const registerValidationSchema = yup.object().shape({
    name:nameSchema.required('name is required'),
    email:emailSchema.required(),
    password:passwordSchema.required()
})
export const updateValidationSchema = yup.object().shape({
    name:nameSchema,
    email:emailSchema,
    password:passwordSchema
})