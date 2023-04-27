const mockDatabase = [];
const createNewOrder = async (req, res, next) => {
  try {
    const { vendor, orderTitle } = req.body;
    mockDatabase.push({ vendor, orderTitle });
    res.status(200).send(mockDatabase);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewOrder,
};
