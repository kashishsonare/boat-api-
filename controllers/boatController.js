///////////////using joi///////////////////////////
const Joi = require("joi");
const Boat = require("../models/Boat");
const boatSchema = Joi.object({
  boatName: Joi.string().alphanum().min(3).max(30).required(),
  boatId: Joi.string().required(),
  boatCategory: Joi.string().required(),
  boatLocation: Joi.string().required(),
  boatDescription: Joi.string().required(),
  averageSpeed: Joi.number().required(),
  topspeed: Joi.number().required(),
  torque: Joi.number().required(),
  fuelType: Joi.string().required(),
  totalseats: Joi.number().required(),
  cabin: Joi.string().required(),
  weightCapacity: Joi.number().required(),

  amenities: Joi.array().items(Joi.string()).optional(),
  price: Joi.number().required(),
  images: Joi.array().items(Joi.string()).optional(),
  rentalTimeHours: Joi.array()
    .items(
      Joi.object({
        hours: Joi.number().required(),
        price: Joi.string().required(),
      })
    )
    .required(),
  pricePerHour: Joi.string().required(),
  dayweekTime: Joi.array()
    .items(
      Joi.object({
        day: Joi.string().required(),
        time: Joi.number().required(),
        to: Joi.number().required(),
      })
    )
    .optional(),
});

const createBoat = async (req, res) => {
  try {
    const { error } = boatSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      boatName,
      boatId,
      boatCategory,
      boatLocation,
      boatDescription,
      averageSpeed,
      topspeed,
      torque,
      fuelType,
      totalseats,
      cabin,
      weightCapacity,
      amenities,
      price,
      rentalTimeHours,
      pricePerHour,
      dayweekTime,
    } = req.body;

    const images = req.files.map(
      (file) => `${process.env.ASSEST_URL}/${file.filename}`
    );

    const newBoat = new Boat({
      boatName,
      boatId,
      boatCategory,
      boatLocation,
      boatDescription,
      images,
      averageSpeed,
      topspeed,
      torque,
      fuelType,
      totalseats,
      cabin,
      weightCapacity,
      amenities,
      price,
      rentalTimeHours: rentalTimeHours.map((item) => ({
        hours: item.hours,
        price: item.price,
      })),
      pricePerHour: pricePerHour,
      dayweekTime: dayweekTime.map((item) => ({
        day: item.day,
        time: item.time,
        to: item.to,
      })),
    });

    await newBoat.save();
    res.status(201).json(newBoat);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getBoats = async (req, res) => {
  try {
    const boats = await Boat.find();
    res.status(200).json(boats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getBoatById = async (req, res) => {
  try {
    const { boatId } = req.params;
    const boat = await Boat.findOne({ boatId });

    if (!boat) {
      return res.status(404).json({ message: "Boat not found" });
    }

    res.status(200).json(boat);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateBoat = async (req, res) => {
  try {
    const { boatId } = req.params;
    const updateData = req.body;

    if (req.files) {
      const images = req.files.map(
        (file) => `${process.env.ASSEST_URL}/${file.filename}`
      );
      updateData.images = images;
    }

    const { error } = boatSchema.validate(updateData);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const updatedBoat = await Boat.findOneAndUpdate({ boatId }, updateData, {
      new: true,
    });

    if (!updatedBoat) {
      return res.status(404).json({ message: "Boat not found" });
    }

    res.status(200).json({
      message: "Boat updated successfully",
      data: updatedBoat,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteBoatById = async (req, res) => {
  try {
    const { boatId } = req.params;
    const deletedBoat = await Boat.findOneAndDelete({ boatId });
    if (!deletedBoat) {
      return res.status(404).json({ message: "Boat not found" });
    }
    res.status(200).json({ message: "Boat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateBoat2 = async (req, res) => {
  try {
    const { boatId } = req.params;
    const updateData = req.body;

    if (req.files) {
      const images = req.files.map((file, index) => ({
        index,
        url: `${process.env.ASSEST_URL}/${file.filename}`,
      }));
      updateData.images = images;
    }

    const { error } = boatSchema.validate(updateData);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const updatedBoat = await Boat.findOneAndUpdate({ boatId }, updateData, {
      new: true,
    });

    if (!updatedBoat) {
      return res.status(404).json({ message: "Boat not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedBoat,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createBoat,
  getBoats,
  getBoatById,
  updateBoat,
  deleteBoatById,
  updateBoat2,
};
