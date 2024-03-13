import styles from "@/shared/Components/professional/profileOverlay.module.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const ProfileOverlay = ({ onClose, data }) => {
  const router = useRouter();
  const {data: session} = useSession()
  const user = session?.user

  const handleClick = () => {
    router.push("/professional/profile-update");
  };
  return (
    <div className={styles.details}>
      <div className={styles.overlay_content}>
        <div className={styles.close_btn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="currentColor"
            width="16"
            height="16"
            onClick={onClose}
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </div>
        <div className={styles.profileDetails}>
          <img src={data.image} alt="Profile" />
          <h2>{user.name}</h2>
          <div className={styles.lines}></div>
        </div>
        <div className={styles.detailsBtn}>
          <div className={styles.btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 512 512"
            >
              <title>ionicons-v5-k</title>
              <polygon points="103 464 48 464 48 409 358.14 98.09 413.91 153.87 103 464" />
              <path d="M425.72,142,370,86.28l31.66-30.66C406.55,50.7,414.05,48,421,48a25.91,25.91,0,0,1,18.42,7.62l17,17A25.87,25.87,0,0,1,464,91c0,7-2.71,14.45-7.62,19.36ZM418.2,71.17h0Z" />
            </svg>
            <button  onClick={handleClick}>Edit</button>
          </div>
          <div className={styles.line}></div>
          <div className={styles.btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {" "}
              <g>
                {" "}
                <path fill="none" d="M0 0h24v24H0z" />{" "}
                <path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z" />{" "}
              </g>{" "}
            </svg>
            <button
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          </div>
          <div className={styles.line}></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverlay;
