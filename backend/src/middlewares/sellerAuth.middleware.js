import sellerService from "../service/sellerService.js";
import jwtProvider from "../utils/jwtProvider.js";

const sellerMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json(({ message: "Invalid token, authorization denied" }));
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json(({ message: "No token, authorization denied" }));
        }

        let email = await jwtProvider.getEmailFromJwt(token);

        const seller = await sellerService.getSellerByEmail(email);
        req.seller = seller;
        next();


    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

export default sellerMiddleware;
