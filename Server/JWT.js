const JWT = require('jsonwebtoken');

const getToken = (user) => {
    const token = JWT.sign({username: user.username}, 'jwtsecret');
    return token;
}

const verifyToken = (req, res, next) => {
    const token = req.cookies['accessToken']
    if(!token) {
        res.status(404).send('pass the token')
    } else {
        try{
            const verifyToken = JWT.verify(token, 'jwtsecret')
            if(!verifyToken){
                res.status(404).send('toen mismatch')
            }
            res.authenticated = true;
            return next();
        }
        catch(err) {
            res.status(404).send({error: err})
        }
    }
}


module.exports ={ getToken, verifyToken }