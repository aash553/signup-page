const { sign } = require("jsonwebtoken");
const UserModel = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ 
                message: "User already exists", 
                success: false 
            });
        }

        // Hash the password and save the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ 
            message: "User created successfully", 
            success: true 
        });
    } catch (err) {
        console.error("Error in signup:", err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: "Something went wrong, please try again later",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "Authentication failed. Email not found",
                success: false,
            });
        }

        // Verify the password
        const isPassequal = await bcrypt.compare(password, user.password);
        if (!isPassequal) {
            return res.status(403).json({
                message: "Authentication failed. Incorrect password",
                success: false,
            });
        }
        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_Secret,
            { expiresIn: "21h" }
        );

        return res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
        });
    } catch (err) {
        console.error("Error in login:", err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: "Something went wrong, please try again later",
        });
    }
};

module.exports = {
    signup,
    login
};
