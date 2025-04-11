import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name:  process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error('No file path provided for upload to Cloudinary');
        }
        // Upload the file to Cloudinary
       const fileRes =  await cloudinary.uploader.upload(localFilePath , {resource_type:'auto'})
        // file has been uploaded to cloudinary
        console.log('File uploaded to Cloudinary:', fileRes.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Delete the local file if upload fails
        return null;
    }
}

export { uploadOnCloudinary };