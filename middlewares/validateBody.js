const HttpError = require("../helpers/HttpError");

function validateBody(schema) {
  async function func(req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  }
  return func;
}
module.exports = validateBody;
