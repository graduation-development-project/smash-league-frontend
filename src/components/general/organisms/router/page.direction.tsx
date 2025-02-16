"use client";

import React, { useState, useEffect } from "react";
import { routes } from "./routes";

const PageDirection = () => {

  localStorage.setItem("page", "Home");
  const [page, setPage] = useState(() => localStorage.getItem("page")|| "Home");

  useEffect(() => {
    const handleStorageChange = () => {
      setPage(localStorage.getItem("page") || "Home");
    };

    // Lắng nghe sự kiện thay đổi localStorage từ các tab khác
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Cập nhật state ngay khi localStorage thay đổi trong cùng tab
    const handleLocalChange = () => {
      const storedPage = localStorage.getItem("page") || "Home";
      if (storedPage !== page) {
        setPage(storedPage);
      }
    };

    // Theo dõi sự thay đổi của localStorage trong cùng tab
    window.addEventListener("visibilitychange", handleLocalChange);

    return () => {
      window.removeEventListener("visibilitychange", handleLocalChange);
    };
  }, [page]);

  const route = routes.find((route) => route.name === page);

  if (!route || !route.component) return null;

  const Page = route.component;

  return <Page />;
};

export default PageDirection;
