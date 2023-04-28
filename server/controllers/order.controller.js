const zodExpress = require('zod-express-middleware');
const z = require('zod');

const mockDatabase = [];
const createNewOrder = async (req, res, next) => {
  try {
    const { vendor, orderTitle } = req.body;
    const zodSchema = z.object({
      vendor: z
        .string({ invalid_type_error: 'Vendor is required' })
        .trim()
        .min(1, { message: 'Vendor is required' })
        .max(50, {
          message: 'Vendor cannot be more than 50 characters in length',
        }),
      orderTitle: z
        .string()
        .trim()
        .min(1, { message: 'Order Title is required' })
        .max(50, {
          message: 'Order Title cannot be more than 50 characters in length',
        }),
    });
    const result = zodSchema.safeParse(req.body);
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
