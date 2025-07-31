import User from "../models/User.js";

export const updateAvatar = async (req, res) => {
    try {
        const userId = req.userId;

        let avatarUrl;

        if (req.file) {
            // مسیر عکس آپلود شده روی کلودیناری
            avatarUrl = req.file.path;
        } else if (req.body.url) {
            // اگر آواتار به صورت URL ارسال شده
            avatarUrl = req.body.url;
        } else {
            return res.status(400).json({ msg: "No avatar provided" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { avatar: avatarUrl },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ avatar: user.avatar });
    } catch (err) {
        console.error("updateAvatar error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};
