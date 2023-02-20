const checkToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        next();
    }
    catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};
export default checkToken;
//# sourceMappingURL=checkToken.js.map