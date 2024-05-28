"use client"
import Link from "next/link";
import styles from "./navbar.module.css";
import React, {useState} from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
          <div className={styles.hamburger} onClick={toggleMenu}>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
          </div>
          <div className={`${styles.hidden} ${isOpen ? styles.showMenu: ""}`}>
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
    </nav>
  );
}

export default Navbar;