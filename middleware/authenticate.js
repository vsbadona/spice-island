
import jwt from "jsonwebtoken"

const Authencticate = async(req,res,next) => {

   const JWT = req.query.token;
 
   if (!JWT) return res.status(401).send({ alert: 'No JWT provided' });
   jwt.verify(JWT, process.env.SECRET, (error, user) => {
      if (error) return res.status(401).send({ alert: 'Invalid JWT' });
     req.user = user;

     next();
   });
};
export default Authencticate