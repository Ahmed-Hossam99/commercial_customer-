const posterModel = require('../models/poster')
const userModel = require('../models/user')
const cloud = require('../services/cloudinary')
const fs = require('fs')

const ITEMS_PER_PAGE = 4


exports.addPoster = async (req, res, next) => {

  try {
    console.log('inside!!')

    if (!req.files) {
      res.status(403).json({
        message: 'Must be Enter  Images !!'
      })
    }
    let Img = []
    if (req.files[0]) {
      let result
      result = await cloud.uploads(req.files[0].path)
      Img.push(result.url)
      fs.unlinkSync(req.files[0].path)
    }
    if (req.files[1]) {
      let result
      result = await cloud.uploads(req.files[1].path)
      Img.push(result.url)
      fs.unlinkSync(req.files[1].path)
    }

    if (req.files[2]) {
      let result
      result = await cloud.uploads(req.files[2].path)
      Img.push(result.url)
      fs.unlinkSync(req.files[2].path)
    }
    if (req.files[3]) {
      let result
      result = await cloud.uploads(req.files[3].path)
      Img.push(result.url)
      fs.unlinkSync(req.files[3].path)
    }
    console.log('here!!')
    console.log(Img)
    // create new poster and path his values 
    const newPoster = await new posterModel({
      governorate: req.body.governorate,
      category: req.body.category,
      title: req.body.title,
      photos: Img,
      description: req.body.description,
      phoneNumber: req.body.phoneNumber,
      creator: req.user._id
    })
    console.log(req.user._id)
    await newPoster.save();
    console.log(newPoster)
    res.status(200).json({ newPoster, message: 'poster added done !!' });
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

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

exports.deletePoster = async (req, res, next) => {
  try {

    const posterId = req.params.posterId
    const poster = await posterModel.findById(posterId)
    // check validity of user 
    if (poster.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: ' Not authorized! ' });
    }
    await posterModel.deleteOne(poster)

    res.status(200).json({ message: 'poster deleted ' })

  } catch (error) {
    res.json({ error })
  }

}

exports.updatePoster = async (req, res, next) => {
  try {
    const posterId = req.params.posterId
    const poster = await posterModel.findById(posterId)
    console.log(poster.title)
    // check validity of user 
    if (poster.creator.toString() !== req.user._id.toString()) {

      return res.status(403).json({ message: ' Not authorized! ' });
    }
    if (!poster) {
      const error = new Error('Poster Not found!');
      error.statusCode = 400;//invalid id 
      res.json({ error });
    } else {
      if (req.body.governorate) {
        poster.governorate = req.body.governorate
      }
      if (req.body.category) {
        poster.category = req.body.category
      }
      if (req.body.title) {
        poster.title = req.body.title
      }
      if (req.body.description) {
        poster.describtion = req.body.description
      }
      if (req.body.phoneNumber) {
        poster.phoneNumber = req.body.phoneNumber
      }
      if (req.files[0]) {
        let result = await cloud.uploads(req.files[0].path)
        poster.photos[0] = result.url
        fs.unlinkSync(req.files[0].path)
      }
      if (req.files[1]) {
        let result = await cloud.uploads(req.files[1].path)
        poster.photos[1] = result.url
        fs.unlinkSync(req.files[1].path)
      }
      if (req.files[2]) {
        let result = await cloud.uploads(req.files[2].path)
        poster.photos[2] = result.url
        fs.unlinkSync(req.files[2].path)
      }
      if (req.files[3]) {
        let result = await cloud.uploads(req.files[3].path)
        poster.photos[3] = result.url
        fs.unlinkSync(req.files[3].path)
      }
      await poster.save();
      res.status(201).json({
        poster,
        message: 'poster Updated!!'

      })
    }
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

exports.getMyPoster = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    let totalItems;
    let counter = await posterModel.countDocuments({ creator: req.user._id });
    totalItems = counter
    const userPoster = await posterModel.find({ creator: req.user._id }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
    if (!userPoster) {
      const error = new Error('Posters Not found!');
      error.statusCode = 403;
      return res.json({ error });
    }
    if (userPoster.length < 1) {
      return res.status(200).json({ message: 'No Poster Added !!' })
    }
    return res.status(200).json({ userPoster, totalItems })

  } catch (error) {
    return res.json({ error })
  }

}

