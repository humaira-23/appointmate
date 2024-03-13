import styles from "@/Components/professional/overview/TodayVisit.module.css";
import Image from "next/image";
import logo from "@/shared/images/premium.png"
import Card from "./card";

const TodaysVisit = ({data}) => {
  return (
    <>
    <div className={styles.body}>
        <div className={styles.title}>
        <h2>Today's Visit</h2>
        <p>View All</p>
        </div>
        <div className={styles.grid}>
        {data.map((data,index) => (
            <Card key={index} {...data}/>
            ))}
      </div>
    </div>
    <div>
        <Image src={logo} alt=""/>
    </div>
    </>
  )
}

export  default TodaysVisit;
