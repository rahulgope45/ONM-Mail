import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JWTPAYLOAD{
    id:number
}

export const genreateToken = async (req:Request,res:Response)=>{
    if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET is not defined")
        };

        const{id} = req.body as {id:number}
        const payload : JWTPAYLOAD = {id}
     const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: "7d"
     });
     res.cookie("jwt",token,{
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:true,
        secure:true
     })

}