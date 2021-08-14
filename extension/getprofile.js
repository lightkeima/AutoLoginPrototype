async function getProfile(data = {}) {
    const response = await fetch("http://localhost:8080/api/account", {
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
chrome.storage.sync.get(["data"], ({
    data
}) => {
    getProfile(data).then(function(rdata) {
        fdata = {
            name_of_id_field: data.name_of_id_field,
            name_of_password_field: data.name_of_password_field,
            name_of_button: data.name_of_button,
            name_of_form: data.name_of_form,
            id_find_by: data.id_find_by,
            pass_find_by: data.pass_find_by,
            form_find_by: data.form_find_by,
            button_find_by: data.button_find_by,
            submit_type: data.submit_type,
            username: rdata.data["username"],
            password: rdata.data["password"]
        }
        chrome.runtime.sendMessage({
            message: {
                script: "account",
                data: fdata
            },
        })
    });
});