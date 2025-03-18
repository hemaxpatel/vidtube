import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config()

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    console.log('File uploaded successfully. File src:' + response.url);

    // Delete the file from the local storage
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error('Error on cloudinary: ', error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('File deleted successfully. File src:' + result.url);
    return result;
  } catch (error) {
    console.error('Error deleting on cloudinary: ', error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
