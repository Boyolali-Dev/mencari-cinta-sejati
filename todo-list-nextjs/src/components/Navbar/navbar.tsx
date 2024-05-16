import Link from "next/link";
import styles from "./navbar.module.css";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <div className={styles.hidden}>
            <div className={styles.flexSpace}>
              <Link href="/" passHref className={styles.buttonNavbar}>
                Home
              </Link>
              <Link href="/dashboard" passHref className={styles.buttonNavbar}>
                Dashboard
              </Link>
              <Link href="/team" passHref className={styles.buttonNavbar}>
                Teams
              </Link>
              <Link href="/todo-app" passHref className={styles.buttonNavbar}>
                Todo-App
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;