import { useEffect, useState } from "react";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const [comment, setComment] = useState();
  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({
      commentData: { text: comment },
      quoteId: props.quoteId,
    });
    setComment("");
  };

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="5"
          value={comment}
          onChange={commentHandler}
        />
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
