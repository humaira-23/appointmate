const { ObjectId } = mongoose.Schema;
import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    profId: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    slots: [
        {
            range: String,
            status: String,
            userId: String,
        },
    ],
    message: {
        type: String,
    },
    type: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Slot = mongoose.models.Slot || mongoose.model("Slot", slotSchema)

export default Slot