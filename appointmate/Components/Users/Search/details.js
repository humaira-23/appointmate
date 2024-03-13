import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/Components/Users/Search/optionTab.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

const Details = ({ prof }) => {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/getuser?userId=${prof.userId}`);
        setUserDetails(data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log("Error:", error.message);
        }
      }
    };
    fetchUser();
  }, [prof]);
  

  return (
    <>
      <div>
        <li>
          <div className={styles.image}>
            <img
              src={prof.workspace[0].url}
              width={100}
              height={100}
              // onClick={navigateTo}
            />
          </div>
          <div className={styles.contents}>
            <Link href={`search/explore/${prof._id}`}>
            <h2>{prof.name}</h2>
            </Link>
            <h3>{prof.prefix} {userDetails?.name}</h3>
            <p>{prof.officeAddress}</p>
          </div>
          <div className={styles.contact}>
            <div className={styles.icons}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-phone-call"
              >
                <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
                className={styles.directions}
              >
                <path d="M12,21.25a1.81,1.81,0,0,1-1.28-.53L3.28,13.28a1.81,1.81,0,0,1,0-2.56l7.44-7.44a1.86,1.86,0,0,1,2.56,0l7.44,7.44a1.81,1.81,0,0,1,0,2.56l-7.44,7.44A1.81,1.81,0,0,1,12,21.25Zm0-17a.27.27,0,0,0-.21.09L4.34,11.79a.29.29,0,0,0,0,.42l7.45,7.45a.25.25,0,0,0,.42,0l7.45-7.45a.29.29,0,0,0,0-.42L12.21,4.34A.27.27,0,0,0,12,4.25Z" />
                <path d="M10.73,14.42a.74.74,0,0,1-.53-.22L8,12a.75.75,0,0,1,0-1.06L10.2,8.72a.75.75,0,0,1,1.06,0,.75.75,0,0,1,0,1.06l-1.7,1.68,1.7,1.68a.75.75,0,0,1,0,1.06A.74.74,0,0,1,10.73,14.42Z" />
                <path d="M15.5,15a.76.76,0,0,1-.75-.75v-2H8.5a.75.75,0,0,1,0-1.5h7a.76.76,0,0,1,.75.75v2.79A.76.76,0,0,1,15.5,15Z" />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 15 15"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0ZM1.19729 5.90436C1.06845 6.41489 1 6.94945 1 7.5C1 10.5736 3.1333 13.1489 6 13.8261V13.2071L5 12.2071V10.7071L4 9.70711V8.5C4 8.22386 4.22386 8 4.5 8H8.5C9.32843 8 10 8.67157 10 9.5V10.0118C10.5109 10.0849 10.9151 10.4891 10.9882 11H12.9782C13.625 9.9897 14 8.78864 14 7.5C14 4.79606 12.349 2.47775 10 1.49818V2.5C10 3.32843 9.32846 4 8.50004 4H7.50004C7.2239 4 7.00004 4.22386 7.00004 4.5C7.00004 5.32843 6.32846 6 5.50004 6H5.00004V6.70711L4.5607 7.14645C3.97491 7.73223 3.02516 7.73223 2.43938 7.14645L1.19729 5.90436Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-suit-heart"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
              </svg>
            </div>
            <Link href={`search/book-now/${prof._id}`}>
            <div className={styles.btn}>
              <p>Book Now</p>
            </div></Link>
          </div>
        </li>
        <div className={styles.line}>
          <p></p>
        </div>
      </div>
    </>
  );
};

export default Details;
