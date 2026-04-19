import User from "../models/user.model.js";
import jwtProvider from "../utils/jwtProvider.js";


class userService {

    async findUserProfileByJwt(jwt) {
        const email = jwtProvider.getEmailFromJwt(jwt);

        const user= await User.findOne({ email });
        if (!user) {
            throw new Error(`User does not exist with this email: ${email}`);
        }
        return user;
    }

    async findUserProfileByEmail(email) {
        const user= await User.findOne({ email });
        if (!user) {
            throw new Error(`User does not exist with this email: ${email}`);
        }       
        return user;
    }
}

export default new userService();