import { useState } from 'react';
import PendingAppointment from './pendingAppointment';
import data from '@/Components/professional/schedules/pendingData.json';
import upcomingData from "@/Components/professional/schedules/upcomingData.json"
import UpcomingAppointment from './upcomingAppoinments';
import styles from "@/Components/professional/schedules/schedule.module.css"
// import EventViewTab from './eventViewTab';

const Schedule = ({appointment, prof}) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

    return (
      <>  
      <div className={styles.body}>
        <div className={styles.btns}>
            <div onClick={() => handleTabClick(1)} className={activeTab === 1 ? styles.active : styles.inactive}>
          Appointments
        </div>
        <div onClick={() => handleTabClick(2)} className={activeTab === 2 ? styles.active : styles.inactive}>
          Pending Approval
        </div>
        </div>
        <div>
        {activeTab === 1 && <div><UpcomingAppointment data={data} appointment={appointment} prof={prof} />
        </div>}
        {activeTab === 2 && <PendingAppointment data={data} appointment={appointment} />}
        </div>
      </div>
      </>
    );
  }

export default Schedule;