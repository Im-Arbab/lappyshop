
const productModel = require("../../models/productModel");

const filterProduct = async (req, res) => {
  try {
    const {
      category,
      brand,
      ram,
      processor,
      generation,
      storage,
      screenSize,
      price
    } = req.body;

    let filter = {};

    if (category) filter.category = category;

    if (brand) {
      filter.brand = new RegExp(`^${brand}$`, "i");
    }

    if (ram) {
      filter.$or = [
        { ram: new RegExp(ram, "i") },
        { "variants.ram": new RegExp(ram, "i") }
      ];
    }

    if (processor) {
      filter.$or = [
        { processor: new RegExp(processor, "i") },
        { "specifications.performance.processor": new RegExp(processor, "i") }
      ];
    }

    if (generation) filter.generation = generation;

    if (storage) {
      filter.storage = new RegExp(storage, "i");
    }

    if (screenSize) filter.screenSize = screenSize;

    if (price) {
      filter["variants.price"] = { $lte: Number(price) };
    }

    const products = await productModel.find(filter);

    res.json({ success: true, data: products });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = filterProduct;