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
              <Link href="/" passHref>
                <a className={styles.buttonNavbar}>Home</a>
              </Link>
              <Link href="/dashboard" passHref>
                <a className={styles.buttonNavbar}>Dashboard</a>
              </Link>
              <Link href="/team" passHref>
                <a className={styles.buttonNavbar}>Teams</a>
              </Link>
              <Link href="/todo-app" passHref>
                <a className={styles.buttonNavbar}>Todo-App</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;