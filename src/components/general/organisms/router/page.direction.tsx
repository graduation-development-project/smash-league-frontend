"use client";

import React, { useState, useEffect } from "react";
import { routes } from "./routes";
import Spinner from "../../atoms/loaders/spinner";

const PageDirection = () => {
  const [page, setPage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPage = localStorage.getItem("page") || "Home";
      setPage(storedPage);
    }

    // Listen for localStorage changes across tabs
    const handleStorageChange = () => {
      setPage(localStorage.getItem("page") || "Home");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!page) {
    return (
      <div>
        <Spinner isLoading={true} />
      </div>
    );
  }

  const route = routes.find((route) => route.name === page);

  if (!route?.component) {
    console.warn(`No component found for page: ${page}`);
    return <div>Page not found</div>;
  }

  const Page = route.component;
  return <Page />;
};

export default PageDirection;
