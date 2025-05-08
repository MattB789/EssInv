const net = require('net');
//actually checks if running
function running(portNum, back) {
    const CS = net.createServer()
        .once('error', err => {
            if (err.code === 'EADDRINUSE') {
                back(null, true);
                return;
            }
            callback(err);
        })
        .once('listening', () => {
            CS.close(() => {
                back(null, false);
            });
        })
        .listen(portNum);
}


const port = 5000; //port number

let isRun = 0;

//displays message and checks if running
running(port, (error, runningPort) => {
    if (error) {
        console.log("IsRun = ", isRun);
    } else if (runningPort) {
        isRun = 1;
        console.log("Is Run =", isRun);
    } else {
        console.log("Is Run =", isRun);
    }
});
