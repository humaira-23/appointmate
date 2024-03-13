import Navbar from "@/shared/Components/professional/navbar";
import Searchbar from "@/shared/Components/professional/searchbar";
import data from "@/shared/Components/professional/profileData.json";
import styles from "@/pages/professional/index.module.css";
import AppointmentStatistics from "@/Components/professional/overview/AppointmentStatistics";
import UserApplications from "@/Components/professional/overview/UserApplications";
import AppointmentData from "@/Components/professional/overview/appointmentData.json"
import TodaysVisit from "@/Components/professional/overview/TodayVisit";
import cardData from "@/Components/professional/overview/cardData.json"

export default function UpdateProfessional() {

    return (
      <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"overview"} />
        </div>
        <div>
          <Searchbar data={data}/>
          <div className={styles.content}>
            <div>
                <AppointmentStatistics/>
                <UserApplications data={AppointmentData}/>
            </div>
            <div>
              <TodaysVisit data={cardData}/>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }