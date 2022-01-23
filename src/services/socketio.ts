import { apiServerAddress } from "../constants";
import { io } from "socket.io-client";
import { probes, apiToStore } from "./probes";
import { heating, cooking } from "./smokerStatus";

export const socket = io(apiServerAddress);

export const startSocketIO = () => {

    socket.on("connected", () => {
        console.log("Socket connected. Listening to events.");
    });

    socket.on("valueRead", (apiProbes: {[name: string]: Probe}) => {
        probes.set(apiToStore(apiProbes));
    });

    socket.on("heatingOn", () => {
        heating.set(true);
    });

    socket.on("heatingOff", () => {
        heating.set(false);
    });
}