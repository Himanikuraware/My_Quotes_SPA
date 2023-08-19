import { useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const submitFormHandler = (event) => {
    event.preventDefault();
    props.onAddQuote({ author, text });
  };

  const formFocusHandler = () => {
    setIsEntering(true);
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  // Determine if both input fields are empty
  const isDisabled = author.trim() === "" || text.trim() === "";

  return (
    <>
      <Prompt
        when={isEntering}
        message={(location) => "Are you sure you want to leave this page?"}
      />
      <Card>
        <form
          className={classes.form}
          onSubmit={submitFormHandler}
          onFocus={formFocusHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              rows="5"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </div>
          <div className={classes.actions}>
            <button
              onClick={finishEnteringHandler}
              className="btn"
              disabled={isDisabled}
            >
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
