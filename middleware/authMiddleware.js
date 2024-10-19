const { extractJWTToken } = require("../constants/constantFinction");
const { Users } = require("../schema/userSchema");

const authenticate = async(req, res, next) => {
    const token = getAuthToken(req)
    if (token) {
        const tokenData = extractJWTToken(token)
        if(await Users.findOne({ _id: tokenData.userId }).exec()){
            req.user = tokenData
            next();
        }else{
            res.status(401).json({ SUCCESS:false, message:"Unauthorized"});
        }
    } else {
        // return unauthorized
        res.status(401).json({ SUCCESS:false, message:"Unauthorized"});
    }
}
function getAuthToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        return req.headers.authorization.split(' ')[1];
    else if (req.query && req.query.token)
        return req.query.token;

    return null;
}

module.exports = { authenticate }