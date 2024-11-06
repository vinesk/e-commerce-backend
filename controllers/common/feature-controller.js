const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featureImage = new Feature({ image });

    await featureImage.save();
    res.status(200).json({ success: true, data: featureImage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const featureImages = await Feature.find({});
    res.status(200).json({ success: true, data: featureImages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

module.exports = { addFeatureImage, getFeatureImages };
