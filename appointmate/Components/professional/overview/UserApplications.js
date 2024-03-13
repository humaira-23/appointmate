import styles from "@/Components/professional/overview/UserApplications.module.css";
import { useRouter } from "next/router";

const UserApplications = ({data}) => {
    const router = useRouter()

    const handleClick=()=>{
        router.push("/professional/schedule")
    }

    // const renderStatusIcon = (status) => {
    //     if (status === "Approved") {
    //       return <svg className={styles.tick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M13.197 4.768a1.745 1.745 0 0 1 2.474 2.474l-7.38 7.38a1.745 1.745 0 0 1-2.474 0l-3.89-3.89a1.745 1.745 0 0 1 2.474-2.474l3.015 3.015 6.305-6.305a1.745 1.745 0 0 1 2.474 0z"/></svg>;
    //     } else {
    //       return <svg className={styles.cross} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 0 .708L7.293 8l-2.647 2.646a.5.5 0 1 1-.708-.708L6.293 8 3.646 5.354a.5.5 0 0 1 .708-.708L8 6.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 9.707l-2.646 2.647a.5.5 0 1 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>;
    //     }
    //   };

  return (
    <>
    <div className={styles.body}>
    <div className={styles.title}>
        <h2>Your Appointments</h2>
        <p onClick={handleClick}>View All</p>
    </div>
    <div className={styles.headings}>
        <p>No.</p>
        <p>Name</p>
        <p>Date</p>
        <p>Time</p>
        <p>Status</p>
    </div>
    {data.map((data,index) => (
    <div className={styles.userDeatils} key={index}>
        <p>{index+1}</p>
        <p>{data.pname}</p>
        <p>{data.date}</p>
        <p>{data.time}</p>
        <p>{data.status}</p>
        {/* <div className={styles.statusIcon}>{renderStatusIcon(data.status)}</div> */}
          </div>
    ))}
    </div>
    </>
    )
}

export default UserApplications;