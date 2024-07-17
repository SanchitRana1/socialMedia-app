import jwt from "jsonwebtoken";

export const verifyToken=async (req,res,next)=>{
    try {
        let token = req.header("Authorization")

        if(!token)  res.status(401).json({ success:false,error: "Access Denied" });

        if(token?.startsWith("Bearer")){
            token = token.split(" ")[1];
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user=verified;
        next();

    } catch (error) {
        res.status(401).json({ success:false,error: "no Auth, token failed !" });
    }
}