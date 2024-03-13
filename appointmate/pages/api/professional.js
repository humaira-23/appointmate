import { createRouter } from "next-connect";
import db from "@/utils/db";
import Professional from "@/models/Professional";
import User from "@/models/User";

const router = createRouter()

router.post(async (req, res) => {
  try {
    db.connectDb();
    const {
      prefix,
      userId,
      name,
      email,
      phone,
      gender,
      professional,
      specialIn,
      // age,
      officeAddress,
      expYears,
      desc,
      workspace,
    } = req.body.newProf;

    const isProf = await Professional.find({userId: userId})
    const user = await User.findById(userId);

    console.log(isProf)

    if (isProf.length > 0) {
      return res.status(500).json({ message: "You are already a professional" });
    } else {
      await new Professional({
        userId: user._id,
        prefix,
        name,
        email,
        phone,
        gender,
        profIn: professional,
        specialIn,
        // age,
        officeAddress,
        expYears,
        desc,
        workspace,
      }).save();
      db.disconnectDb();
      res.status(200).json({
        message: "Successfully Registered as a Professional",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get(async (req, res) => {
  try {
    db.connectDb();
    const {
      profId
    } = req.query;

    const prof = await Professional.findById(profId)

    res.status(200).json({
      message: prof,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();