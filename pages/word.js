import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/word.module.scss";
import Image from "next/image";
import Header from "../components/Header";

const fetcher = async () => {
  fetch("/api/hello").then(async (e) => {
    const data = await e.json();
    return data;
  });
};
export default function AddSound({ userType }) {
  const Classes = {
    words: styles.words,
    word: styles.word,
  };
  const {
    query: { q },
  } = useRouter();
  const { isLoading, error, data } = useQuery(["getWord"], () =>
    fetch("/api/hello").then((res) => res.json())
  );

  // if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <Header userType={userType} />
      <div className={Classes.words}>
        {Array.from({ length: 10 }).map((_, id) => {
          return (
            <div className={Classes.word} key={id}>
              <span className={Classes.item}>كلمة</span>
              <span className={Classes.item}>Word</span>
              <span className={Classes.item}>
                <Image src="/speaker.png" width={30} height={30} />
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
