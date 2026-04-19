
const getUserProfileByJwt = (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json(user);
    } catch (error) {
        handleError(error, res);
    }
}

const handleError = (error, res) => {
    if(err instanceof Error) {
        return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
}

export default { getUserProfileByJwt };