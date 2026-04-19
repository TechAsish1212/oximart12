// import jwt from "jsonwebtoken";


// class JwtProvider {

//     constructor(secretKey){
//         this.jwtSecret = secretKey;
//     }

//     createJwt(payload){
//         jwt.sign(payload, this.jwtSecret, { expiresIn: '24h' });
//     }

//     getEmailFromJwt(token){
//         try {
//             deecodedToken = jwt.verify(token, this.jwtSecret);
//             return deecodedToken.email;
//         } catch (error) {
//             throw new Error("Invalid token");
//         }
//     }

//     verifyJwt(token){
//         try {
//             jwt.verify(token, this.jwtSecret);
//         } catch (error) {
//             throw new Error("Invalid token");
//         }
//     }
// }

// export default new JwtProvider(process.env.JWT_SECRET);


import jwt from "jsonwebtoken";

class JwtProvider {
    createJwt(payload) {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET is missing in environment variables");
        return jwt.sign(payload, secret, { expiresIn: '24h' });
    }

    getEmailFromJwt(token) {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET is missing in environment variables");
        try {
            const decodedToken = jwt.verify(token, secret);
            return decodedToken.email;
        } catch {
            throw new Error("Invalid token");
        }
    }

    verifyJwt(token) {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET is missing in environment variables");
        try {
            jwt.verify(token, secret);
        } catch {
            throw new Error("Invalid token");
        }
    }
}

export default new JwtProvider();
