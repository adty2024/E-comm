const fetchData = () => {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {resolve('Done');}, 1000);
    });
    return p;
};

setTimeout(() => {
    fetchData().then((text) => {
        console.log(text + " " + "printed");
        return fetchData();
    })
    .then((text) => {
        console.log(text);
    });
}, 1000);

function logYaay() {
    console.log("yaay");
}

// const interval = setInterval(logYaay, 1000); // Print "yaay" every 1000 milliseconds (1 second)

// setTimeout(() => {
// clearInterval(interval); // Stop the interval after 4 seconds
// }, 4000);