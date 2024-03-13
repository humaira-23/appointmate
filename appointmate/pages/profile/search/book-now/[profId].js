import Navbar from "@/shared/Components/users/navbar";
import Searchbar from "@/shared/Components/users/searchBar";
import data from "@/shared/Components/users/profileData.json";
import styles from "@/pages/profile/index.module.css";
import AppointmentForm from "@/Components/Users/Search/appoinmentForm";
import ProfDetails from "@/Components/Users/Search/ProfDetails";
import db from "@/utils/db";
import Professional from "@/models/Professional";
import Slot from "@/models/Slot";
import User from "@/models/User";
import { getSession } from "next-auth/react";


export default function Appointments({prof,slots, user}) {

    return (
      <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"search"} />
        </div>
        <div>
          <Searchbar data={data}/>
          <div className={styles.content}>
          <AppointmentForm prof={prof} slots={slots} user={user} />
          <ProfDetails prof={prof} />
          </div>
        </div>
      </div>
      </>
    );
  }

export async function getServerSideProps(context) {
  const { req, query,res } = context;
  const profId = query.profId
  const session = await getSession({ req });
  db.connectDb();
  const getUser = await User.findById(session.user.id)
  const getProf = await Professional.findById(profId);
  const getSlot = await Slot.find({profId: profId});
  const isProf = await Professional.find({userId: session.user.id})
  db.disconnectDb();
  if (Array.isArray(isProf) && isProf.length > 0) {
    res.setHeader("Location", "/professional/profile");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        prof: JSON.parse(JSON.stringify(isProf)),
      },
    };
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(getUser)),
      prof: JSON.parse(JSON.stringify(getProf)),
      slots: JSON.parse(JSON.stringify(getSlot)),
    },
  };
}