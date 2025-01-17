import socket from "./socket";
import { useEffect } from "react";

const useSocketSetup = () => {
  useEffect(() => {
    socket.connect();
  }, []);
};

export default useSocketSetup;
