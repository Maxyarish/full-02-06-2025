module.exports.buildFilterProducts = async (req, res, next) => {
  try {
    const { minPrice, maxPrice, availablity, category, sale } = req.query;
    req.filter = {};
    if (minPrice || maxPrice) {
      req.filter.price = {};
      if (minPrice) {
        req.filter.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        req.filter.price.$lt = Number(maxPrice);
      }
    }
    if (availablity) {
      req.filter.stockQty = {};
      if (availablity === true) {
        req.filter.stockQty.$gte;
      } else {
        req.filter.stockQty = 0;
      }
    }

    if (category) {
      req.filter.category = category;
    }
    if (sale) {
      req.filter.isSale = Boolean(sale);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.filterOrders = async (req, res, next) => {
  try {
    const {user,status,method} = req.query;
    req.filter = {};
    if (user) {
      req.filter.user = user;
    }
    if (status) {
      req.filter.status = status;
    }
    if (method) {
      req.filter.shippingMethod = method.replace("_", "");
    }
    next();
  } catch (error) {
    next(error);
  }
};
