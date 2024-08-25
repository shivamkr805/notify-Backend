import dotenv from 'dotenv'
import jwt  from 'jsonwebtoken';
dotenv.config()
export const authMiddleware={
    async verifyjwt (req,res,next){
        const authHeader = req.headers.authorization;
        if(!authHeader){
        return res.send({msg:'auth headers is not provided'}).status(400)
       }
       const secret_token=process.env.JWT_SECRET
    //    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    //    if(!token){
    //     return res.send({msg:'auth token is not provided'}).status(400)
    //    }
       jwt.verify(authHeader,secret_token, (err, decoded) => {
        if (err) {
            return res.status(401).send({ msg: 'Invalid token' });
        }
        req.user = decoded; // Add user data to request object
        next();
       })
    }
}