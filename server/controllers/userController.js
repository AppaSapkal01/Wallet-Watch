require('dotenv').config();

const asyncHandler = require('express-async-handler');
const User = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    //Register
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new Error("Please all fields are required.");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("User already exists.");
        }

        const salt = await bcrypt.genSalt(10);
        const hanshedPassword = await bcrypt.hash(password, salt);

        const userCreated = await User.create({
            email,
            username,
            password: hanshedPassword
        })

        res.json({
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id
        })
    }),

    //Login
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid login credentails')
        };

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error('Invalid login credentials')
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        });

        res.json({
            message: 'Login Sucess',
            token,
            id: user._id,
            email: user.email,
            username: user.username,
        })
    }),

    profile: asyncHandler(async(req, res) => {
        const user = await User.findById(req.user);
        if(!user) {
            throw new Error('User not found');
        }

        res.json({
            username: user.username,
            email: user.email,
        })
    }),

    //Change Password
    changeUserPassword: asyncHandler(async (req, res) => {
        const {newPassword} = req.body;

        const user = await User.findById(req.user);
        if(!user) {
            throw new Error('User not found');
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save({
            validateBeforeSave: false,
        });

        res.json({message: 'Password Changed successfully'})

    }),

    // Update Profile
    updateUserProfile: asyncHandler(async (req, res) => {
        const {email, username} = req.body;

        const updatedUser = await User.findByIdAndUpdate(req.user, {
            username,
            email,
        }, {
            new: true,
        })
        res.json({message: 'User profile updated successfully', updatedUser})

    })

}

module.exports = userController;

