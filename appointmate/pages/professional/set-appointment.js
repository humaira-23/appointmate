import Navbar from "@/shared/Components/professional/navbar";
import Searchbar from "@/shared/Components/professional/searchbar";
import data from "@/shared/Components/professional/profileData.json";
import styles from "@/pages/professional/index.module.css";
import Identity from "@/Components/professional/profile/identity";
import AppointmentForm from "@/Components/professional/appointment/appointmentForm";
import { getSession } from "next-auth/react";
import db from "@/utils/db";
import Professional from "@/models/Professional";
import User from "@/models/User";

export default function SetAppointment({prof, user}) {

    return (
      <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"appointment"} />
        </div>
        <div>
          <Searchbar data={data}/>
          <div className={styles.contents}>
            <Identity user={user} prof={prof} />
            <AppointmentForm prof={prof} />
          </div>
        </div>
      </div>
      </>
    );
  }

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });
  db.connectDb();
  const getUser = await User.findById(session.user.id)
  const getProf = await Professional.find({ userId: session.user.id });

  db.disconnectDb();
  if (Array.isArray(getProf) && getProf.length === 0) {
    res.setHeader("Location", "/profile/register");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(getUser)),
      prof: JSON.parse(JSON.stringify(getProf)),
    },
  };
}