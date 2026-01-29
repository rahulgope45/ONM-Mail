import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized No Token provided" });
        }
        ;
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        ;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.send(400).json({ message: "Failed to decode" });
        }
        ;
        const user = await prisma.user.findUnique({
            where: { id: decoded.user.id },
            select: { id: true, email: true, password: true }
        });
        if (!user)
            return res.status(401).json({ message: "User not found" });
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
//# sourceMappingURL=auth.middleware.js.map