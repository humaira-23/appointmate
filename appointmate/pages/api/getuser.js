import { createRouter } from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";

const router = createRouter()

router.get(async (req, res) => {
  try {
    db.connectDb();
    const {userId} = req.query;

    const user = await User.findById(userId);

    console.log(user)

    if (!user) {
      return res.status(500).json({ name: "Name not mentioned" });
    } else {
        return res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();