import React from "react";

import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Himani",
    text: "I love Reactjs",
  },
  {
    id: "q2",
    author: "Shaily",
    text: "I love Nodejs",
  },
];

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
