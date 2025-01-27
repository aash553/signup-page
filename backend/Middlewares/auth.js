const jwt = require('jsonwebtoken')
const ensureAuthentication = (req,res,next)=>{
    const auth = req.headers['authorization']
    if(!auth){
        return res.status(403).json({
            message: 'No token provided , jwt token is required'
        })
    }
    try {
        const decoded = jwt.verify(auth,process.env.JWT_Secret)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'jwt token is wrong'
        })
    }
}

module.exports = ensureAuthentication;