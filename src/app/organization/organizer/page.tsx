"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";

const Organizer = () => {
  const socketRef = useRef<Socket | null>(null); // Store socket reference

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://smashit.com.vn", {
        transports: ["websocket"],
      });

      socketRef.current.on("connect", () => {
        console.log("Connected to Socket.io");
      });

      socketRef.current.on("message", (data) => {
        toast.info(data, {
          position: "top-right",
          theme: "light",
        });
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const runWithLocal = () => {
    toast.info("Notification with local", {
      position: "top-right",
      theme: "light",
    });
  };

  const runWithEvent = () => {
    if (socketRef.current) {
      socketRef.current.emit("message", "Hello from client");
    }
  };

  return (
    // <MainLayout>
    <div>
      <Button onClick={runWithLocal}>Run with Local</Button>
      <Button onClick={runWithEvent}>Run with Event</Button>
    </div>
    // </MainLayout>
  );
};

export default Organizer;
