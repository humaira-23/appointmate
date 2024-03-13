import Navbar from "@/shared/Components/professional/navbar";
import Searchbar from "@/shared/Components/professional/searchbar";
import data from "@/shared/Components/professional/profileData.json";
import styles from "@/pages/professional/index.module.css";
import Details from "@/Components/professional/profile/details";
import Identity from "@/Components/professional/profile/identity";
import Schedule from "@/Components/professional/schedules/schedule";
import Appointment from "@/models/Appointment";
import { getSession } from "next-auth/react";
import Professional from "@/models/Professional";
import db from "@/utils/db";

export default function UpdateProfessional({appointment, prof}) {

    return (
      <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"schedule"} />
        </div>
        <div>
          <Searchbar data={data}/>
          <Schedule appointment={appointment} prof={prof} />
        </div>
      </div>
      </>
    );
  }

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });
  db.connectDb();
  const getProf = await Professional.find({ userId: session.user.id });
  const getAppointment = await Appointment.find({ profId: getProf[0]._id })
  .sort({ date: 1 });

  db.disconnectDb();
  if (Array.isArray(getProf) && getProf.length === 0) {
    res.setHeader("Location", "/profile/register");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return {
    props: {
      appointment: JSON.parse(JSON.stringify(getAppointment)),
      prof: JSON.parse(JSON.stringify(getProf)),
    },
  };
}