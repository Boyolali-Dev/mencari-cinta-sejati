import Link from "next/link";
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <div className={styles.hidden}>
            <div className={styles.flexSpace}>
              <Link href="/" className={styles.buttonNavbar}>
                Home
              </Link>
              <Link href="/dashboard" className={styles.buttonNavbar}>
                Dashboard
              </Link>
              <Link href="/team" className={styles.buttonNavbar}>
                Teams
              </Link>
              <Link href="/todo-app" className={styles.buttonNavbar}>
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
