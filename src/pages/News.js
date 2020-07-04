import React from "react";
import PageContainer from "../components/Layout/PageContainer";
import { useSelector } from "react-redux";

export default function News() {
  const { lastNews } = useSelector((state) => state.userData);
  return (
    <PageContainer>
      {lastNews.map((newsItem) => (
        <div key={newsItem.published}>
          <h2>{newsItem.title}</h2>
          <p>{newsItem.shortContent}</p>
        </div>
      ))}
    </PageContainer>
  );
}
