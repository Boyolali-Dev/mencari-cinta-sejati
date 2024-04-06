"use client";

import Image from "next/image";
import styles from "./page.module.css";
import TodoCard from "../components/todocard/todocard";
import { TodoCardType } from "@/components/todocard/enum";
import { useState } from "react"; // Tambahkan useState

export default function Home() {
  const [cards, setCards] = useState([
    {
      id: 1,
      activity: "Ngarit",
      deadline: "30/12/2024",
      type: TodoCardType.Todo,
    },
    {
      id: 2,
      activity: "Mepe jagung",
      deadline: "30/12/2024",
      type: TodoCardType.InProgress,
    },
    {
      id: 3,
      activity: "Gawe SPJ",
      deadline: "30/12/2024",
      type: TodoCardType.Completed,
    },
    {
      id: 4,
      activity: "Bayar UKT",
      deadline: "30/12/2024",
      type: TodoCardType.Hold,
    },
  ]);

  // Fungsi untuk memindahkan kartu ke Completed
  const handleComplete = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, type: TodoCardType.Completed } : card
      )
    );
  };

  // Fungsi untuk memindahkan kartu ke In Progress
  const handleInProgress = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, type: TodoCardType.InProgress } : card
      )
    );
  };

  // Fungsi untuk memindahkan kartu ke Hold
  const handleHold = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, type: TodoCardType.Hold } : card
      )
    );
  };

  // Fungsi untuk menghapus card
  const handleDelete = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <div className={styles.column}>
          <h2>To Do</h2>
          {/* Tampilkan kartu dengan tipe Todo */}
          {cards
            .filter((card) => card.type === TodoCardType.Todo)
            .map((card) => (
              <TodoCard
                key={card.id}
                {...card}
                onComplete={handleComplete}
                onInProgress={handleInProgress}
                onHold={handleHold}
                onDelete={handleDelete}
              />
            ))}
        </div>
        <div className={styles.column}>
          <h2>In Progress</h2>
          {/* Tampilkan kartu dengan tipe InProgress */}
          {cards
            .filter((card) => card.type === TodoCardType.InProgress)
            .map((card) => (
              <TodoCard
                key={card.id}
                {...card}
                onComplete={handleComplete}
                onInProgress={handleInProgress}
                onHold={handleHold}
              />
            ))}
        </div>
        <div className={styles.column}>
          <h2>Completed</h2>
          {/* Tampilkan kartu dengan tipe Completed */}
          {cards
            .filter((card) => card.type === TodoCardType.Completed)
            .map((card) => (
              <TodoCard key={card.id} {...card} onDelete={handleDelete} />
            ))}
        </div>
        <div className={styles.column}>
          <h2>Hold</h2>
          {/* Tampilkan kartu dengan tipe Hold */}
          {cards
            .filter((card) => card.type === TodoCardType.Hold)
            .map((card) => (
              <TodoCard
                key={card.id}
                {...card}
                onComplete={handleComplete}
                onInProgress={handleInProgress}
                onHold={handleHold}
              />
            ))}
        </div>
      </div>

      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
