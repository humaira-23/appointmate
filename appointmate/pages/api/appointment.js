import { createRouter } from "next-connect";
import db from "@/utils/db";
import Slot from "@/models/Slot";
import Appointment from "@/models/Appointment";
import Professional from "@/models/Professional";
import User from "@/models/User";
const router = createRouter()

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { profId,userId,slotId, name, date, time, phone, appointmentForName, message } = req.body.newAppointment;

    let status = "Pending"

    const slot = await Slot.findOneAndUpdate(
      { profId: profId, date: date, 'slots.range': time },
      {
        $set: {
          'slots.$.userId': userId,
          'slots.$.status': "Pending" // assuming type is 'manual'
        }
      },
      { new: true }
    );

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.type === 'Auto') {
      const autoSlotIndex = slot.slots.findIndex(slot => slot.range === time);
      if (autoSlotIndex !== -1) {
        slot.slots[autoSlotIndex].status = "Booked";
      }
      await slot.save();
      status = "Booked"
    }

    const businessName = await Professional.findById(profId)
    const profName = await User.findById(businessName.userId)

    const appointment = new Appointment({
      profId,
      userId,
      slotId: slot._id,
      status,
      profName: profName.name,
      businessName: businessName.name,
      image: businessName.workspace[0].url,
      officeAddress: businessName.officeAddress,
      name,
      date,
      time,
      phone,
      appointmentForName,
      message,
    });
    await appointment.save();

    res.status(200).json({ message: status });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(async (req, res) => {
  try {
    db.connectDb();
    const { slotId,profId,userId,date,time } = req.query;

    const appointment = await Appointment.findOneAndUpdate(
      { slotId: slotId,profId: profId,userId: userId, date: date, time: time },
      {
        $set: {
          status: "Cancled"
        }
      },
      { new: true }
    );
    await appointment.save();

    const slot = await Slot.findOneAndUpdate(
      { profId: profId, date: date, 'slots.range': time },
      {
        $set: {
          'slots.$.status': "Cancled"
        }
      },
      { new: true }
    );
    await slot.save();

    res.status(200).json({ message: "The appointment has been cancled sucessfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(async (req, res) => {
  try {
    db.connectDb();
    const { slotId,profId,userId,date,time,status } = req.query;

    const appointment = await Appointment.findOneAndUpdate(
      { slotId: slotId,profId: profId,userId: userId, date: date, time: time },
      {
        $set: {
          status: status
        }
      },
      { new: true }
    );
    await appointment.save();

    const slot = await Slot.findOneAndUpdate(
      { profId: profId, date: date, 'slots.range': time },
      {
        $set: {
          'slots.$.status': status
        }
      },
      { new: true }
    );
    await slot.save();

    res.status(200).json({ message: `The appointment has been ${status} sucessfully`});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();