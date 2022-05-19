const jwt = require('jsonwebtoken');
const { User } = require('../../Database/Models/User');

module.exports.verifyUser = async (req) => {
    try {
        req.email = null;
        req.loggedInUserId = null;
        const barerHeader = req.headers.authorization;
        if (barerHeader) {
            const token = barerHeader.split(' ')[1].trim();
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.email = payload.email;
            const user = await User.findOne({ email: payload.email });
            req.loggedInUserId = user.id;
        }
    } catch (err) {
        throw err;
    }

}