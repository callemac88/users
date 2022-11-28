import boom from "@hapi/boom";

export const validatorHandler = (schema, property, res, req) => {
  const data = req[property];
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    boom.badRequest(error);
  }
};
