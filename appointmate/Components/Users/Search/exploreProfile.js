import styles from "@/Components/Users/Search/exploreProfile.module.css";
import { useRouter } from "next/router"
import Link from "next/link";

const ExploreProfile = ({prof, user}) => {
    const router = useRouter();

    const handleClick = () => {
      router.push("/profile/search/book-now");
    };
  
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.identity}>
            <img src={prof.workspace[0].url} alt="profile"></img>
            <div>
              <h2>{prof.name}</h2>
              <h4>Business Account</h4>
              <h5>
                {prof.officeAddress}
              </h5>
              <p>
                Open now: <span>until 9:00pm</span>
              </p>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.social}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 32 32"> <path d="M32 6v20c0 1.135-0.865 2-2 2h-2v-18.151l-12 8.62-12-8.62v18.151h-2c-1.135 0-2-0.865-2-2v-20c0-0.568 0.214-1.068 0.573-1.422 0.359-0.365 0.859-0.578 1.427-0.578h0.667l13.333 9.667 13.333-9.667h0.667c0.568 0 1.068 0.214 1.427 0.578 0.359 0.354 0.573 0.854 0.573 1.422z"/></svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                height="24"
                width="24"
                fill="currentColor"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="24"
                width="24"
                fill="currentColor"
              >
                <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="24"
                width="24"
                fill="currentColor"
              >
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
              </svg>
            </div>
          <div className={styles.btn}>
            <button value="Call" className={styles.callBtn}>
              Call Now
            </button>
            <Link href={`/profile/search/book-now/${prof._id}`}>
            <button value="Book" className={styles.bookBtn}>
              Book Appointment
            </button>
            </Link>
          </div>
          </div>
        </div>
        <div className={styles.profInfo}>
            <h2>Professional Details</h2>
            <div className={styles.details}>
                <h3>Name:</h3>
                <p>{user.name}</p>
            </div>
            <div className={styles.details}>
                <h3>Specialization in:</h3>
                <p>{prof.specialIn}</p>
            </div>
            <div className={styles.details}>
                <h3>Experience:</h3>
                <p>{prof.expYears} Years</p>
            </div>
            <div className={styles.abt}>
                <h3>About Us:</h3>
                <p>{prof.desc}</p>
                </div>
        </div>
      </div>
    </>
  );
};

export default ExploreProfile;
