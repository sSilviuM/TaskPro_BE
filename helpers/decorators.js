function controllerWrapper(controllerFunction) {
  async function wrapperFunction(req, res, next) {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      console.error(`Error in ${controllerFunction.name}:`, error);
      next(error);
    }
  }
  return wrapperFunction;
}

module.exports = controllerWrapper;
