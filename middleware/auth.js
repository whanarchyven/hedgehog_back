//auth.js
import jwt from "jsonwebtoken"

const auth=(req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if (token === null) return res.sendStatus(401);

    jwt.verify(token, 'a29fa2a6b70a36a032c8f5cfeabe852aa77551aad154da1b2da579ac161d41bcd978aad1223d0d86bf5c4e8e5a017a434f84cd5c5d8c00573117a8b7bb18a0eb', {}, (err, user) => {
        if (err){return res.status(403).json({error:err,token:token});};
        req.user = user;
        next();
    });
}

export default auth