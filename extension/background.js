chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, tabs => {
            let url = tabs[0].url;
            var data = {
                url: url
            }
            /*
                        chrome.storage.sync.set({
                            data: data
                        });
                        
                        chrome.scripting.executeScript({
                                target: {
                                    tabId: tabId
                                },
                                files: ["./urlsupport.js"]
                            })
                            .then(() => {
                                console.log("INJECTED THE FOREGROUND SCRIPT.");
                            });
                        */
            chrome.runtime.sendMessage({
                message: {
                    script: "url_support",
                    data: data
                }
            })
        });

    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, tabs => {
        if (request.message.script === 'url_support_done') {
            var data;
            if (request.message.data.data !== "Not found") {
                var rdata = request.message.data.data;
                data = {
                    web_id: rdata.id,
                    id: 0,
                    name_of_id_field: rdata.name_of_id_field,
                    name_of_password_field: rdata.name_of_password_field,
                    name_of_button: rdata.name_of_button,
                    name_of_form: rdata.name_of_form,
                    id_find_by: rdata.id_find_by,
                    pass_find_by: rdata.pass_find_by,
                    form_find_by: rdata.form_find_by,
                    button_find_by: rdata.button_find_by,
                    submit_type: rdata.submit_type,
                };
                /*
                chrome.storage.sync.set({
                    data: data
                });

                chrome.scripting.executeScript({
                        target: {
                            tabId: tabs[0].id
                        },
                        files: ["./getprofile.js"]
                    })
                    .then(() => {
                        console.log("INJECTED THE FOREGROUND SCRIPT.");
                    });
                */
                chrome.runtime.sendMessage({
                    message: {
                        script: "getprofile",
                        data: data
                    }
                })
                return true;
            }
            return false;

        } else if (request.message.script === 'account') {
            var data;
            if (request.message.data.data !== "Not found") {
                data = request.message.data;
                chrome.storage.sync.set({
                    data: data
                });
                chrome.scripting.executeScript({
                        target: {
                            tabId: tabs[0].id
                        },
                        files: ["./autofill.js"]
                    })
                    .then(() => {
                        console.log("INJECTED THE FOREGROUND SCRIPT.");
                    });
                return true;
            }
            return false;

        }
    });
});