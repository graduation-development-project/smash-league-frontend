"use client";

import React, { useState, useEffect } from "react";
import { routes } from "./routes";

const PageDirection = () => {
  const [page, setPage] = useState(() => localStorage.getItem("page") || "/");

  useEffect(() => {
    const handleStorageChange = () => {
      setPage(localStorage.getItem("page") || "/");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const route = routes.find((route) => route.name === page);

  if (!route || !route.component) return null;

  const Page = route.component;

  return <Page />;
};

export default PageDirection;
