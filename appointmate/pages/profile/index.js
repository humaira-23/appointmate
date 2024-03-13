import WelcomeNote from "@/Components/Users/welcomeNote";
import { getSession } from "next-auth/react";
import Navbar from "@/shared/Components/users/navbar";
import styles from "@/pages/profile/index.module.css";
import EventTab from "@/Components/Users/eventTab";
import tabs from "@/Components/Users/eventData.json"
import Categories from "@/Components/Users/categories";
import Searchbar from "@/shared/Components/users/searchBar";
import appointmentData from "@/Components/Users/appointmentData.json"
import data from "@/shared/Components/users/profileData.json";
import db from "@/utils/db";
import User from "@/models/User";
import Professional from "@/models/Professional";

export default function Users({user}) {
  return (
    <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"profile"} />
        </div>
        <div>
          <Searchbar data={data} user={user} />
          <WelcomeNote user={user} />
          <EventTab tabs={tabs} data={appointmentData}/>
          <Categories />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req,res } = context;
  const session = await getSession({ req });
  db.connectDb();
  const getUser = await User.findById(session.user.id);
  const getProf = await Professional.find({userId: session.user.id})
  db.disconnectDb();
  if (Array.isArray(getProf) && getProf.length > 0) {
    res.setHeader("Location", "/professional/profile");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        prof: JSON.parse(JSON.stringify(getProf)),
      },
    };
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(getUser)),
    },
  };
}

 