import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import styles from "./loginnav.module.css";

import logo from "../images/logo1.png";

function LoginNavbar() {
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
                  className= {styles.link
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/appointment"
                  exact="true"
                  className= {styles.link
                  }
                >
                  Book Now
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  exact="true"
                  className= {styles.link
                  }
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  exact="true"
                  className= {styles.link
                  }
                >
                  About us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default LoginNavbar;
