const User = require('../models/user.schema')
const mongoose = require('mongoose')
const { sign } = require("jsonwebtoken")


const add_user = async (req, res) => {
    try {
        const { name, address, mobile_number, email, password, company_name } = req.body;
        // Check if the user already exists
        const existingUser = await User.findOne({ email, company_name });
        if (existingUser) {
            return res.status(400).json({ status: "failed", message: 'User already exists' });
        }

        const newUser = new User({ name, address, mobile_number, email, password, company_name });
        await newUser.save();
        return res.status(200).json({ status: "success", message: "User Successfully Created" });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const login = async (req, res) => {
    try {
        const { email, password, company_name } = req.body;
        const user = await User.findOne({ email, company_name });

        if (!user) {
            return res.status(200).json(
                {
                    status: "failed",
                    message: 'Invalid username or password'
                }
            );
        }
        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json(
                {
                    status: "failed",
                    message: 'Invalid username or password'
                });
        }

        // Generate JWT token
        const token = sign({ userId: user.id }, 'thisismysecrettoken', {
            expiresIn: '1h', // Token expiration time (1 hour in this case)
        });

        res.status(200).json({ status: "success", message: 'Successfully Login', data: user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to log in' });
    }
}
const getUser = async (req, res, next) => {
    try {
        //   const page = parseInt(req.body.page) - 1 || 0;
        //   const limit = parseInt(req.body.limit) || 5;

        const user_data = await User.find({}).sort({ createdAt: -1 })
        // .skip(page * limit)
        // .limit(limit);
        // const total = await User.countDocuments(S);

        res.status(200).json({ status: "success", user_data });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
const delete_user = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndRemove(userId);
        return res.status(200).json({ status: "success", message: 'User Deleted Successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const update_user = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        return res.status(200).json(
            {
                status: "success",
                message: "User Successfully Updated",
                data: updatedUser
            });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    add_user,
    login,
    getUser,
    update_user,
    delete_user
}