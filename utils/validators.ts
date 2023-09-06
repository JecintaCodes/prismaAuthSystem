import joi from "joi"


let regex =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;



export const createUserValidator = joi.object({
    userName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().
    pattern(new RegExp(regex)).required(),
    confirm: joi.ref("password")
})

export const signInUsersValidator = joi.object({
    email: joi.string().email().lowercase().trim().required,
    password: joi.string().pattern(RegExp(regex)).required(),

})

export const changePasswordValidator = joi.object({
    userName: joi.string().required(),
    email: joi.string().email().lowercase().trim().required,
    password: joi.string().pattern(RegExp(regex)).required(),
    confirm: joi.ref("password")
})


export const resetAccountPasswordValidator = joi.object({
    email: joi.string().email().lowercase().trim().required,

})