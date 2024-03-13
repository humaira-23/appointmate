import styles from "@/shared/Components/users/profileOverlay.module.css";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const ProfileOverlay = ({ onClose, data }) => {
  const router = useRouter();
  const {data: session} = useSession()
  const user = session?.user

  const handleClick = () => {
    router.push("/profile/register");
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
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-switch-horizontal" width="14" height="14" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <polyline points="16 3 20 7 16 11" /> <line x1="10" y1="7" x2="20" y2="7" /> <polyline points="8 13 4 17 8 21" /> <line x1="4" y1="17" x2="13" y2="17" /> </svg>
            <button  onClick={handleClick}>
              Be A Professional
            </button>
          </div>
          <div className={styles.line}></div>
          <div className={styles.btn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"/> </g> </svg>
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
