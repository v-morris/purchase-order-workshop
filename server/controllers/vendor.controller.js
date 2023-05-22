const getVendors = async (req, res, next) => {
  try {
    const mockDatabase = [
      'The Paper Supply Co.',
      'Beef Jerky Inc.',
      'Boxes & More',
    ];
    res.status(200).json(mockDatabase);

    if (!mockDatabase) {
      res.status(500).send({
        name: 'Database',
        message: 'Failed to connect to database',
        status: 500,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVendors,
};
