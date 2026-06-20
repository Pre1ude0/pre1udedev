// debug.js
process.on("SIGINT", () => {
    console.log(process._getActiveHandles());

    for (const h of process._getActiveHandles()) {
        if (h.constructor?.name === "Socket") {
            console.log("Socket:", {
                remoteAddress: h.remoteAddress,
                remotePort: h.remotePort,
                localPort: h.localPort
            });
        }
    }
});

import('./build/index.js');
