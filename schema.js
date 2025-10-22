const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().max(100).required(),
        type: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        description:Joi.string().max(1000).required(),
        pricePerDay: Joi.number().required().min(0),
        imageUrl: Joi.string().allow("", null),
        location: Joi.string().required(),
        community: Joi.string().allow(""),  
        
        availableFrom: Joi.date().optional(),
        isAvailable: Joi.boolean().optional(),
        shareOnly: Joi.boolean().optional(),
    }).required(), 
});

// review schema

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),   //rating should be a number and minimum value is 1 and maximum value is 5
        comment : Joi.string().required()
    }).required()
})