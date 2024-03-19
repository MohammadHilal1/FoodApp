"use client";
import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div className="error">
      <h1>An error occured</h1>
      <p>Failed to fetch data.Please try later.</p>
    </div>
  );
};

export default ErrorPage;
