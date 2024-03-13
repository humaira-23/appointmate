import Navbar from "@/shared/Components/users/navbar";
import Searchbar from "@/shared/Components/users/searchBar";
import data from "@/shared/Components/users/profileData.json";
import styles from "@/pages/profile/index.module.css";
import upcomingData from "@/Components/Users/appointment/appointmentData.json"
import UpcomingAppointment from "@/Components/Users/appointment/appointment";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import db from "@/utils/db";
import Appointment from "@/models/Appointment";

export default function Search({appointment}) {

    return (
      <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"appointment"} />
        </div>
        <div>
          <Searchbar data={data}/>
          <UpcomingAppointment appointment={appointment}/>
        </div>
      </div>
      </>
    );
  }

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  db.connectDb();
  const getUser = await User.findById(session.user.id);
  const getAppointment = await Appointment.find({
    userId: getUser._id,
  }).sort({ date: 1 });
  db.disconnectDb();
  return {
    props: {
      appointment: JSON.parse(JSON.stringify(getAppointment)),
      user: JSON.parse(JSON.stringify(getUser)),
    },
  };
}