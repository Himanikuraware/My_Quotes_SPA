import React from "react";

import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const addQuoteHandler = (data) => {
  };
  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
