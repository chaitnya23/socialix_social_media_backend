const jwt = require('jsonwebtoken')

const createToken = async(userName)=>{

    const token = await jwt.sign({userName:userName} ,"chaitnyagiriprojectsocialix2306@jwtkey")
    return token;
}

module.exports = createToken;