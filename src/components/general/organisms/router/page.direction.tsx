"use client";

import React, { useState, useEffect } from "react";
import { routes } from "./routes";
import Spinner from "../../atoms/loaders/spinner";

const PageDirection = () => {
  const [page, setPage] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("page", "Home");
      const storedPage = localStorage.getItem("page") || "Home";
      setPage(storedPage);

      // Find the route for the stored page and get its path
      const route = routes.find((route) => route.name === storedPage);
      setCurrentUrl(route ? route.path : null);
    }

    const handleStorageChange = () => {
      const newPage = localStorage.getItem("page") || "Home";
      setPage(newPage);

      const route = routes.find((route) => route.name === newPage);
      setCurrentUrl(route ? route.path : null);
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

  return (
    <div>
      <Page />
    </div>
  );
};

export default PageDirection;
