import styles from "@/Components/professional/profile/details.module.css";
import Image from "next/image";
import image from "@/shared/images/professional_profile.svg"

const Details = () => {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.details}>
            <h3>About</h3>
            <p>
            A software engineer is a computer science professional who builds software products and maintains computer systems. They use scientific and mathematical principles, engineering principles, and programming languages to solve problems and create computer software.
            </p>
          </div>
          <div className={styles.details}>
            <h3>Education</h3>
            <p>BSc CS - VESASC, 2016</p>
          </div>
          <div className={styles.details}>
            <h3>Specialization</h3>
            <p>Software Engineer</p>
          </div>
          <div className={styles.details}>
            <h3>Experience</h3>
            <p>
            <span>5</span> years
            </p>
          </div>
        </div>
          <div className={styles.content}>
            <Image src={image}/>
        </div>
      </div>
    </>
  );
};

export default Details;
