import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import styles from "./header.module.css";
import { useSession, signIn } from "next-auth/react"
import logo from "../images/logo3.png";

function NavLinks({ pageActive, prof }) {
  const { pathname } = useRouter();
  const { data: session } = useSession()

  // Display the login link only if the user is not on the login page
  if (pathname === '/login') {
    return null;
  }
  return (
    <header>
      <nav>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <Link href="">
              <Image src={logo} alt="LOGO" />
            </Link>
          </div>
          <div className={styles.navbar}>
            <ul>
              <li>
                <Link
                  href="/"
                  exact="true"
                  className={
                    pageActive == "home" ? styles.linkactive : styles.link
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  exact="true"
                  className={
                    pageActive == "book" ? styles.linkactive : styles.link
                  }
                >
                  Book Now
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  exact="true"
                  className={
                    pageActive == "services" ? styles.linkactive : styles.link
                  }
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  exact="true"
                  className={
                    pageActive == "about" ? styles.linkactive : styles.link
                  }
                >
                  About us
                </Link>
              </li>
            </ul>
          </div>
          
          {
            session && prof.length < 1 && (
              <Link  href="/profile">
            <div className={styles.loginBtn}>
              <div>My Profile</div>
          </div>
            </Link>
            )
          }
            {!session && (
              <div className={styles.loginBtn}>
                  <div onClick={() => {signIn()}} >Login</div>
                  </div>
              )}
              {
                session && prof.length > 0 && (
                  <Link  href="/professional/profile">
                <div className={styles.loginBtn}>
                  <div>My Profile</div>
              </div>
                </Link>
                )
              }
        </div>
      </nav>
    </header>
  );
}

export default NavLinks;
