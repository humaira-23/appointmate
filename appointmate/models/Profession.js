import mongoose from "mongoose";

const professionSchema = new mongoose.Schema({
   profName: {
    type: String,
        required: true,
        trim: true,
        unique: true,
   },
   specialIn : []
}, {
    timestamps: true
})

const Profession = mongoose.models.Profession || mongoose.model("Profession", professionSchema)

export default Profession