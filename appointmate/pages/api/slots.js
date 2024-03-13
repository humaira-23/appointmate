import { createRouter } from "next-connect";
import db from "@/utils/db";
import Slot from "@/models/Slot";
import { ObjectId } from "mongodb";

const router = createRouter()

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { profId, date, slots, message, type } =
      req.body.newSlot;

      const isSlot = await Slot.find({ profId, date });

      if (isSlot.length > 0) {
        return res.status(500).json({ message: "There is already a slot in the selected date, Please select a different date" });
      }

      const formattedSlots = slots.map(slot => ({
        range: slot.range,
        status: "Vacant",
        userId: ""
      }));

    await new Slot({
        profId,
        date,
        slots: formattedSlots,
        message,
        type,
    }).save();
    db.disconnectDb();
    res.status(200).json({
      message: "Slot created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();