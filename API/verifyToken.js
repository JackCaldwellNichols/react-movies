const jwt = require('jsonwebtoken')


function verify(req, res, next) {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if(error) res.status(403).json("Token not valid");
            req.user = user
            next()
  
        })
    }else{
        return res.status(401).json("No token")
    }

}

module.exports = verify 