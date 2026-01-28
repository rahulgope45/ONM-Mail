import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import type { NextFunction, Request, Response } from 'express';


interface MyJWTPayload {
    user: {id:number
    };
}
interface AuthenticatedRequest extends Request{
    user?:{
        id:number;
        email: string;
        password: string;
    }
}

export const protectRoute = async (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1]
        if(!token){
            return res.status(401).json({message: "Unauthorized No Token provided"});
        };
        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET is not defined")
        };
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as MyJWTPayload;
        if(!decoded){
            return res.send(400).json({message: "Failed to decode"})
        };
        const user = await prisma.user.findUnique({
            where:{ id: decoded.user.id},
            select:{id:true,email:true,  password: true}
        })
        if(!user) return res.status(401).json({ message: "User not found" });

        req.user =user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}