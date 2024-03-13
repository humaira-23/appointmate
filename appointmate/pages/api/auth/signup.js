import { createRouter } from "next-connect"
import db from "@/utils/db"
import { validateEmail } from "@/utils/validation"
import User from "@/models/User"
import bcrypt from "bcrypt"

const router = createRouter()

router.post(async (req, res) => {
    try {
        db.connectDb()
        const {name, email,phone, password} = req.body
        if (!name || !email || !phone || !password ) {
            return res.status(400).json({message : "Please fill in all the details"})
        }
        if(!validateEmail(email)) {
            return res.status(400).json({message : "Invaild email"})
        }

        const user = await User.findOne({email: email})
        if(user) {
            res.status(400).json({message: "This email already exists."})
        }
        if (password.length < 6) {
            res.status(400).json({message: "Password must be atleast 6 characters long"})
        }
        const hashedPassword = await bcrypt.hash(password, 16)

        const newUser = new User({name, email, phone, password: hashedPassword})
        const addedUser = await newUser.save()
        await db.disconnectDb()
        res.json({message: "Register Success!"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router.handler()

