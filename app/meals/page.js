import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
import LoadingPage from "./loading-out";

export const metadata = {
  title: "All meals",
  description: "Browse the delicious meals shared by our vibrant community",
};

async function Meals() {
  let meals = await getMeals();
  if (Array.isArray(meals)) {
    return <MealsGrid meals={meals} />;
  } else {
    throw new Error(meals);
  }
}

const MealsPage = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Food is art, and the plate is{" "}
          <span className={classes.highlight}>your canvas</span>
        </h1>
        <p>Choose your recipe and try it.</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favourite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<LoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
