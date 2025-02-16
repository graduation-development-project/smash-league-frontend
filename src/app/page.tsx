"use client";

import PageDirection from "@/components/general/organisms/router/page.direction";
import MainLayout from "@/components/layout/mainlayout/layout";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an async operation (e.g., fetching data, checking localStorage)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Short delay to allow hydration

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <PageDirection />
        </div>
      )}
    </MainLayout>
  );
}
