const zodExpress = require('zod-express-middleware');
const { createOrderValidationSchema } = require('@common/validations');

const mockDatabase = [];
const createNewOrder = async (req, res, next) => {
  try {
    const { vendor, orderTitle } = req.body;
    const result = createOrderValidationSchema.safeParse(req.body);
    if (result.success) {
      mockDatabase.push({ vendor, orderTitle });
      res.status(200).send(mockDatabase);
    } else {
      zodExpress.sendError({ type: 'Body', errors: result.error }, res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewOrder,
};
