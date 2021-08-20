async function getUrlSupport(data = {}) {
    const response = await fetch("http://localhost:8080/api/url", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            "X-Api-Key": "LMAO"
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message.script === 'url_support') {
        var data = request.message.data.data;
        getUrlSupport(data).then((rdata) => {
            chrome.runtime.sendMessage({
                message: {
                    script: "url_support_done",
                    data: rdata
                }
            })
        });
    }
});