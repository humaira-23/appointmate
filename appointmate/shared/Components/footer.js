import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

import logo from "../images/logo3.png";
import insta from "../images/Social/insta.png";
import twitter from "../images/Social/twitter.png";
import facebook from "../images/Social/facebook.png";
import whatsapp from "../images/Social/whatsapp.png";
import linkedin from "../images/Social/linkedin.png";

function Footer() {
  return (
    <footer>
      <div className={styles.main}>
        <div className={styles.body}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src={logo} alt="LOGO" />
            </Link>
          </div>
          <div className={styles.content}>
            <div className={styles.textRow1}>
              <p>Privacy Policy</p>
              <p>Terms & Conditions</p>
              <p>About</p>
            </div>
            <div className={styles.icons}>
              <div>
                <Link href="https://www.facebook.com/">
                  <Image src={facebook} alt="facebook" />
                </Link>
                <Link href="https://www.instagram.com/">
                  <Image src={insta} alt="instagram" />
                </Link>
                <Link href="https://twitter.com/">
                  <Image src={twitter} alt="twitter" />
                </Link>
                <Link href="https://www.linkedin.com/">
                  <Image src={linkedin} alt="linkedin" />
                </Link>
                <Link href="https://web.whatsapp.com/">
                  <Image src={whatsapp} alt="whatsapp" />
                </Link>
              </div>
            </div>
            <div className={styles.textRow2}>
              <p>Support</p>
              <p>FAQ's</p>
              <p>Contact</p>
            </div>
          </div>
          <div className={styles.credits}>
            <div className={styles.circle}>
              <div className={styles.letter}>C</div>
            </div>
            <p>2024 Appointmate, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
