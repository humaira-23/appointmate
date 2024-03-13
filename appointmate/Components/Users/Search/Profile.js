import styles from "./Profile.module.css"
import Image from "next/image";
import logo from "@/shared/images/person1.png"

const Profile = ({prof}) => {
  return (
    <>
    <div className={styles.body}>
    <div className={styles.lines}></div>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.identity}>
            <Image src={logo} alt="profile"></Image>
            <div>
                <h2>{prof.name}</h2>
                <p>Business Account</p>
                </div>
          </div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.contact}>
          <h3>Email Address:</h3>
          <p>{prof.email}</p>
          <h3>Phone:</h3>
          <p>{prof.phone}</p>
          <h3>Location:</h3>
          <p>{prof.officeAddress}</p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Profile;
