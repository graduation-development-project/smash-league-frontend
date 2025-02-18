"use client";

import React, { useState, useEffect } from "react";
import { routes } from "./routes";

const PageDirection = () => {
  // Start with `null` to avoid SSR mismatch
  const [page, setPage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPage = localStorage.getItem("page") || "Home";
      setPage(storedPage);
    }

    // Listen for localStorage changes
    const handleStorageChange = () => {
      setPage(localStorage.getItem("page") || "Home");
    };

    // Lắng nghe sự kiện thay đổi localStorage từ các tab khác
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (page === null) {
    // Avoid rendering until client-side state is ready
    return <div>Loading...</div>;
  }

  const route = routes.find((route) => route.name === page);

  if (!route?.component) {
    console.warn(`No component found for page: ${page}`);
    return null;
  }

  const Page = route.component;

  return <Page />;
};

export default PageDirection;
