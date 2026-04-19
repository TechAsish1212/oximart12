import userRole from "../domain/userRole.js";
import authService from "../service/authService.js";

class AuthController {

    async sendLoginOTP(req, res) {
        try {
            const email = req.body.email;
            await authService.sendLoginOTP(email);
            return res.status(200).json({ message: 'OTP sent to email successfully' });
        } catch (error) {
            return res.status(error instanceof Error ? 400 : 500).json({ message: error.message });
        }
    }

    // signup user
    async createUser(req, res) {
        try {
            const jwt = await authService.createUser(req.body); 
            const response = {
                jwt,
                message: "User created successfully",
                role: userRole.CUSTOMER,
            };

            return res.status(201).json(response);
        } catch (error) {
            console.error("Signup Error:", error);
            return res
                .status(error instanceof Error ? 400 : 500)
                .json({ message: error.message });
        }
    }


    // signin user
    async signinUser(req, res) {
        try {
            const response= await authService.signinUser(req.body);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(error instanceof Error ? 400 : 500).json({ message: error.message });
        }
    }
}


export default new AuthController();