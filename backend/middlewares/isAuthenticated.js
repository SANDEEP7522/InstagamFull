import jwt from 'jsonwebtoken';


 const isAuthenticated = async (req, res, next) => {
 try {
    const token = req.cookies.token; //  take token from user.controlles
    if(!token){
        return res.status(401).json({
            massag: 'User not authenticated!',
            success: false,
        })
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
     if (!decode) {
        return res.status(401).json({
            massag: 'Invalid',
            success: false,
        })
     }
     req.id = decode.userId;
     next()
    } catch (error) {
        console.log(error);
        
    }
}
export default isAuthenticated;