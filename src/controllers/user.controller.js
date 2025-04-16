import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  // email is valid or password is valid
  // check if user already exists
  // check for image , check for avatar
  // upload them to cloudinary , avatar
  // Create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response
  const {fullname,username,email,password} = req.body;
  console.log({fullname,username,email,password} , "Registered Data : ");
  if([fullname , username , email,password]?.some((field) => field.trim() === "")){
    throw new ApiError(400 , "Please provide all fields");
  }
  if(!email.includes("@")){
    throw new ApiError("Invalid Email Address !")
  }
  const existedUser = User.findOne(
    {
      $or : [{email} , {username}]
    }
  )
  if(existedUser){
    throw new ApiError(409 , "User Already Exist !")
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if(!avatarLocalPath){
    throw new ApiError(400 , "Avatar is required")
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if(!avatar){
    throw new ApiError(400 , "Avatar is required !")
  }
  const user = await User.create({
    fullname,
    avatar : avatar?.url,
    coverImage : coverImage?.url || "",
    username : username?.toLowerCase(),
    password,
    email
  })
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiError(500 , "Sonething went wrong whlle registering the user !")
  }
  return res.status(
    201
  ).json(
    new ApiResponse(200 , createdUser , "User successfully created !")
  )
});


