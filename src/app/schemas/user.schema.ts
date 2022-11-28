import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);

export const createUserSchema = () => {
  const userSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
  });
  return userSchema; // .validate(data, { abortEarly: false });
};

export const updateUserSchema = (data) => {
  const userSchema = Joi.object({
    id: id.required(),
  });

  return userSchema.validate(data, { abortEarly: false });
};

// module.exports = { createUserSchema, updateUserSchema };
