import React from "react";

import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const addQuoteHandler = (data) => {
    console.log(data, 'dataa')
  };
  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
