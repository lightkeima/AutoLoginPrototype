const router = require("express").Router();
const Account = require("../model/Account");
const Url = require("../model/SupportSite.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


router.post("/addaccount", async (req, res) => {

    isAccountExist = await Account.findOne({
        web_id: req.body.web_id,
        username: req.body.web_id,
    });

    if (isAccountExist) {
        return res.status(400).json({
            error: 'User has been created'
        });
    }

    // Hash Password

    const account = new Account({
        id: req.body.id,
        web_id: req.body.web_id,
        username: req.body.web_id,
        password: req.body.password,
    });

    try {
        const savedaccount = await account.save();
        res.status(200).json({
            data: savedaccount
        });
    } catch (error) {
        res.status(400).json({
            error
        });
    }
});


router.post("/addurl", async (req, res) => {

    isUrlExist = await Url.findOne({
        url: req.body.url,
    });

    if (isUrlExist) {
        return res.status(400).json({
            error: 'url has been created'
        });
    }

    // Hash Password
    // *_find_by: value is "id" or "name"
    // submit_type: if submit type = false, the button is used.
    const url = new Url({
        id: req.body.id,
        url: req.body.url,
        name_of_id_field: req.body.name_of_id_field,
        name_of_password_field: req.body.name_of_password_field,
        name_of_button: req.body.name_of_button,
        name_of_form: req.body.name_of_form,
        id_find_by: req.body.id_find_by,
        pass_find_by: req.body.pass_find_by,
        form_find_by: req.body.form_find_by,
        button_find_by: req.body.button_find_by,
        submit_type: req.body.submit_type
    });

    try {
        const savedurl = await url.save();
        res.status(200).json({
            data: savedurl
        });
    } catch (error) {
        res.status(400).json({
            error
        });
    }
});

router.post("/account", async (req, res) => {

    isAccountExist = await Account.findOne({
        id: req.body.id
    });

    if (isAccountExist) {
        return res.status(200).json({
            data: isAccountExist
        });
    } else res.status(400).json({
        data: "Not found"
    });

});

router.post("/url", async (req, res) => {

    isUrlExist = await Url.findOne({
        url: req.body.url,
    });

    if (isUrlExist) {
        return res.status(200).json({
            data: isUrlExist
        });
    } else res.status(400).json({
        data: "Not found"
    });

});


module.exports = router;