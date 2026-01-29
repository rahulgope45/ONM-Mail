import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { genreateToken } from "../lib/utils.js";
export const signup = async (req, res) => {
    //from the body
    try {
        const { username, email, password, profilepic } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({
                message: "Please enter all the credentials"
            });
            return;
        }
        ;
        if (password.length < 6) {
            res.status(400).json({
                message: "Please enter a password of 6 characters atleast"
            });
            return;
        }
        ;
        //If user already exists 
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (user) {
            res.status(400).json({
                message: "User already exists"
            });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashPassword,
                profilepic
            }
        });
        // res.status(201).json({
        //     message: "User Created sucessfully",
        //     user:{
        //     id: newUser.id,
        //     username: newUser.username,
        //     email: newUser.email,
        //     profilepic: newUser.profilepic,
        //     date: newUser.createdat
        // }
        // });
        if (newUser) {
            genreateToken(newUser.id, res);
            res.status(201).json({
                id: newUser.id,
                fullName: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilepic,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Please enter all the details"
            });
        }
        //checking user exists or not
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({
                message: "User doesn't exists"
            });
        }
        //checking passwords 
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            res.status(400).json({
                message: "Please enter correct password"
            });
        }
        genreateToken(user.id, res);
        return res.status(201).json({
            id: user.id,
            fullName: user.username,
            email: user.email,
            profilePic: user.profilepic,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};
export const updateUser = async (req, res) => {
};
export const deleteUser = async (req, res) => {
};
//# sourceMappingURL=auth.controller.js.map