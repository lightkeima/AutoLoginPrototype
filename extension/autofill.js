function login(name_of_id_field,
    name_of_password_field,
    name_of_button,
    name_of_form,
    id_find_by,
    pass_find_by,
    form_find_by,
    button_find_by,
    submit_type,
    id,
    pass) {
    var id_field;
    var password_field;
    var button;
    var submit_form;
    if (id_find_by === "name")
        id_field = document.getElementsByName(name_of_id_field)[0];
    else
        id_field = document.getElementById(name_of_id_field);
    if (pass_find_by === "name")
        password_field = document.getElementsByName(name_of_password_field)[0];
    else
        password_field = document.getElementById(name_of_password_field);
    if (submit_type === true) {

        if (form_find_by === "name")
            submit_form = document.getElementsByName(name_of_form)[0];
        else
            submit_form = document.getElementById(name_of_form);
    } else {
        if (button_find_by === "name")
            button = document.getElementBysName(name_of_button)[0];
        else
            button = document.getElementById(name_of_button);
    }
    id_field.value = id;
    password_field.value = pass;
    if (submit_type === true) {

        submit_form.submit();
    } else {
        button.click();
    }
}

chrome.storage.sync.get(["data"], ({
    data
}) => {

    login(data.name_of_id_field,
        data.name_of_password_field,
        data.name_of_button,
        data.name_of_form,
        data.id_find_by,
        data.pass_find_by,
        data.form_find_by,
        data.button_find_by,
        data.submit_type,
        data.username,
        data.password);
});