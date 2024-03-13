import { useRouter } from "next/router";
import styles from "@/Components/professional/profile/identity.module.css"
import phone from "@/shared/images/Social/phone.png"
import mail from "@/shared/images/Social/mail.png"
import logo from "@/shared/images/person1.png"
import Image from "next/image";

const Identity = ({user, prof}) => {
    const router = useRouter();

    const handleClick = () => {
      router.push("/professional/profile-update");
    };
    return (
      <> 
      <div className={styles.body}>
        <div className={styles.content}>
            <Image src={logo} alt="profile"/>
            <div className={styles.info}>
                <h2>{prof[0]?.prefix} {user.name}</h2>
                <p>{prof[0]?.specialIn} {prof[0]?.profIn}</p>
                <div className={styles.social}>
                <Image src={mail}/>
                <Image src={phone}/>
                </div>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.btn}onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/> </svg>
                <p>Update Profile</p>
            </div>
        </div>
        </div> 
      </>  
    );
  }

export default Identity;