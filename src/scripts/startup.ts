import { probes, maxTargetTemp } from "../services/probes.js";
import { heating, cooking } from "../services/smokerStatus"
import { getProbes, getHeating, getMaxTemp } from "../services/smokerPiAPI.js";
import { startSocketIO, socket } from "../services/socketio.js";

export const startup = async () => {
    try {
        probes.set(await getProbes());
        heating.set(await getHeating());
        maxTargetTemp.set(await getMaxTemp());
        maxTargetTemp.subscribe((value) => console.log(value));
    } catch {
        socket.on("connected",  async () => {
            probes.set(await getProbes());
            heating.set(await getHeating());
            maxTargetTemp.set(await getMaxTemp());
        });
    }
    startSocketIO();
}