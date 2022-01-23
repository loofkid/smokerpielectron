const { contextBridge } = require("electron");
const networkInterfaces = require("os").networkInterfaces;

contextBridge.exposeInMainWorld("api", {
    networkInterfaces: () => networkInterfaces(),
});