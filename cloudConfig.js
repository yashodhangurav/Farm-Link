const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'farmlink_DEV', //foldername in cloudinary account to store uploaded images
      allowedformats: ["png", "jpg", "jpeg"], //supported document formate to upload
    },
  });

  module.exports = {
    cloudinary,
    storage,
  };