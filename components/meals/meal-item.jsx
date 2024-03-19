import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./meal-item.module.css";

const MealItem = ({ title, image, creator, summary, slug }) => {
  let words = summary.split(" ");
  let shortSummary = summary;
  if (words.length > 20) {
    shortSummary = words.slice(0, 15).join(" ");
    shortSummary = shortSummary + "...";
  }
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://mohammadhilal-food-images-bucket.s3.ap-south-1.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{shortSummary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};

export default MealItem;
