import jwt from "jsonwebtoken";
export const genreateToken = async (id, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    ;
    //   const{id} = req.body as {id}
    const payload = { id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
        secure: true
    });
};
//# sourceMappingURL=utils.js.map