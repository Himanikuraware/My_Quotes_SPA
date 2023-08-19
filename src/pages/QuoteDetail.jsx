import React from "react";
import { useParams } from "react-router-dom";

const QuoteDetail = () => {
  const params = useParams();
  return (
    <div>
      <h1>Quote Detail</h1>
      <span>{params.quoteId}</span>
    </div>
  );
};

export default QuoteDetail;
