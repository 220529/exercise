// chrome://inspect/#workers

const set = new Set();
onconnect = event => {
    console.log("event", event)
    const port = event.ports[0];
    set.add(port);
    port.onmessage = e => {
        set.forEach(p => {
            if (p !== port) {
                p.postMessage(e.data);
            }
        })
    }
    port.postMessage("work.js done")
}