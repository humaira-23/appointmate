const { ObjectId } = mongoose.Schema;
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    profId: {
        type: String,
    },
    userId: {
        type: String,
    },
    slotId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    profName: {
        type: String,
        required: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    officeAddress: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    appointmentForName: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
}, {
    timestamps: true
})

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema)

export default Appointment