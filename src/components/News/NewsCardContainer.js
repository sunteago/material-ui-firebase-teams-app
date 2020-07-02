import React from "react";
import SingleNews from "./SingleNews";

export default function NewsCardContainer({ news }) {
  return (
    <>
      {news.map((singleNews) => (
        <SingleNews key={singleNews.id} title={singleNews.title} />
      ))}
    </>
  );
}