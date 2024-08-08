import User from "../models/user.model.js";

export const getUserForSidebar = async (req ,res) =>{
    try {
        const loggedID = req.user._id;
        
        const filteredUsers = await User.find({
            _id :{
                $ne : loggedID
            }
        }).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUserForSidebar Controller", error.message);
        return res.status(500).json({ error: "Internal Server error" });
    }
}