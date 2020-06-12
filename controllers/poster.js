const posterModel = require('../models/poster')
const userModel = require('../models/user')
const cloud = require('../services/cloudinary')
const ITEMS_PER_PAGE = 4
// get all poster 
exports.getPosters = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    let totalItems;
    let counter = await posterModel.countDocuments();
    const posters = await posterModel.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
    console.log(posters.length)
    totalItems = counter
    if (!posters) {
      const error = new Error('Posters Not found!');
      error.statusCode = 404;
      res.json({ error });
    }
    if (posters.length < 1) {
      return res.status(200).json({ message: 'no poster added!!' })
    }
    return res.status(200).json({ posters, totalItems })

  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

exports.getGovernratePosters = async (req, res, next) => {
  try {
    const queryGovernorate = req.query.city
    const page = req.query.page || 1;
    let totalItems;
    let counter = await posterModel.countDocuments({ governorate: queryGovernorate });
    totalItems = counter
    console.log(queryGovernorate)
    const posters = await posterModel.find({ governorate: queryGovernorate }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
    if (!posters) {
      const error = new Error('Posters Not found!');
      error.statusCode = 403;
      return res.json({ error });
    }
    if (posters.length < 1) {
      return res.status(200).json({ message: 'No Posters about this Governorate!' })
    }
    res.status(200).json({ posters, totalItems })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

exports.getCategoryPosters = async (req, res, next) => {
  try {
    const querycategory = req.query.type
    const page = req.query.page || 1;
    let totalItems;
    let counter = await posterModel.countDocuments({ category: querycategory });
    totalItems = counter
    console.log(querycategory)
    const posters = await posterModel.find({ category: querycategory }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
    if (!posters) {
      const error = new Error('Posters Not found!');
      error.statusCode = 403;
      return res.json({ error });
    }
    if (posters.length < 1) {
      return res.status(200).json({ message: 'No Posters about this category!' })
    }
    res.status(200).json({ posters, totalItems })
  } catch (error) {
    res.json({ error })
  }
}
// get single poster from posters  
exports.getSinglePoster = async (req, res, next) => {
  try {
    const posterId = req.params.posterId
    const poster = await posterModel.findById(posterId)
    if (!poster) {
      res.status(404).json({
        message: 'poster not found !!'
      })
    }
    res.status(200).json({ poster })
  } catch (error) {
    res.json(error)
  }
}

