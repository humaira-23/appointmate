import Navbar from "@/shared/Components/users/navbar";
import Searchbar from "@/shared/Components/users/searchBar";
import data from "@/shared/Components/users/profileData.json";
import styles from "@/pages/profile/index.module.css";
import CalendarComponent from "@/Components/Users/calendar/calendarComponent";
import WelcomeMessage from "@/Components/Users/calendar/WelcomeMessage";
import CalendarEvent from "@/Components/Users/calendar/CalendarEvent";
import EventViewTab from "@/Components/Users/calendar/eventViewTab";
import db from "@/utils/db";
import User from "@/models/User";
import { getSession } from "next-auth/react";

export default function Calendar({user}) {
  return (
    <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"calendar"} />
        </div>
        <div>
          <Searchbar data={data} />
          <div className={styles.content}>
            <div>
              <WelcomeMessage user={user} />
              <CalendarComponent />
            </div>
            <div>
              <CalendarEvent />
            </div>
          </div>
          <div>
            <EventViewTab />
          </div>
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
  db.disconnectDb();
  return {
    props: {
      user: JSON.parse(JSON.stringify(getUser)),
    },
  };
}
