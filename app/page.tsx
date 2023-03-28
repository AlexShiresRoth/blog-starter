import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { getPageBySlug } from "@/contentful/page.api";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const { page, error } = await getPageBySlug({ slug: "home" });

  console.log("page", page, error);
  return <main className={styles.main}></main>;
}
