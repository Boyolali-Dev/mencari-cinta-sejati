import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Link href="/todo-app">
          <h1>Welcome to To Do App Web</h1>
        </Link>
      </main>
    </>
  );
}
