// const express = require('express')
// const router = express.Router()
const router = require('express').Router();
const {House} = require('../../Models/House');
const Formidable = require('formidable');
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose');
require("dotenv").config()
// const { request, response } = require('express');
// const dotenv = require("dotenv");


// dotenv.config();


//mongoDB and Cloudinary

const mongoURI = process.env.Mongo_URI;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


mongoose.connect(mongoURI, {useNewUrlParser:true, useUnifiedTopology:true}, (error)=>{
    if(error) {
        return console.log(error)
    }
    return console.log("database is connected")
})

router.post("/api/house-listing", async (request, response)=>{
    const form = new Formidable.IncomingForm();

    form.parse(request, (error, fields, files)=>{
        const {
            price,
            city,
            county,
            numOfBeds,
            numOfBaths,
            numOfGarages,
            isSaleOrRent,
        } = fields

        const { house_image } = files;

        console.log('Price: ', price)
        console.log('City: ', city)
        console.log('county: ', county)
        console.log('numOfGarages: ', numOfGarages)
        console.log('numOfBeds: ', numOfBeds)
        console.log('numOfBaths: ', numOfBaths)
        console.log('isSaleOrRent: ', isSaleOrRent)
        console.log('houseImage', house_image.path)

        cloudinary.uploader.upload( house_image.path, 
            {folder:"/houseAgency/houses"}, async(error, result)=>{
            if(error) {
                console.log(error)
            }
            const image_url = result.url;

            const newHouse = new House({
                house_location: {
                    
                    county: county,
                    city: city,

                },

                house_details: {
                    price: price,
                    numOfBeds: numOfBeds,
                    numOfBaths: numOfBaths,
                    numOfGarages: numOfGarages,
                    isSaleOrRent: isSaleOrRent,
                    house_image: image_url,
                }
            })
            const savedHouse = await newHouse.save();
            return response.status(200).json(savedHouse)
        })
    })
})



module.exports = router;
