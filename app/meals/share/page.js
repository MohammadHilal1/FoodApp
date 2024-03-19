"use client";

import { useFormState } from "react-dom";
import classes from "./page.module.css";
import ImagePicker from "@/components/meals/image-picker";
import { shareMeal } from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/meals-form-submit";

const ShareMealPage = () => {
  const [state, formAction] = useFormState(shareMeal, { errors: null });
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favourite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name"></input>
              <div className={classes.error}>
                {state.errors &&
                  state.errors.creator &&
                  state.errors.creator[0]}
              </div>
            </p>
            <p>
              <label>Your email</label>
              <input type="email" id="email" name="email"></input>
              <div className={classes.error}>
                {state.errors &&
                  state.errors.creator_email &&
                  state.errors.creator_email[0]}
              </div>
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title"></input>
            <div className={classes.error}>
              {state.errors && state.errors.title && state.errors.title[0]}
            </div>
          </p>
          <p>
            <label htmlFor="summary">Summary</label>
            <input type="text" id="summary" name="summary"></input>
            <div className={classes.error}>
              {state.errors && state.errors.summary && state.errors.summary[0]}
            </div>
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
            ></textarea>
            <div className={classes.error}>
              {state.errors &&
                state.errors.instructions &&
                state.errors.instructions[0]}
            </div>
          </p>
          <div>
            <ImagePicker name={"image"} label={"Your image"} />
            <div className={classes.error}>
              {state.errors && state.errors.image && state.errors.image[0]}
            </div>
          </div>

          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
};

export default ShareMealPage;
