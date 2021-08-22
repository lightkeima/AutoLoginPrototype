const router = require("express").Router();
const Account = require("../model/Account");
const Profile = require("../model/Profile.js");
const Url = require("../model/SupportSite.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");


router.post("/addaccount", async (req, res) => {

    isAccountExist = await Account.findOne({
        profile_id: req.body.profile_id,
        web_id: req.body.web_id,
        username: req.body.web_id,
    });

    if (isAccountExist) {
        return res.status(400).json({
            error: 'User has been created'
        });
    }

    // Hash Password
    var password = CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPT_KEY).toString();

    const account = new Account({
        profile_id: req.body.profile_id,
        id: req.body.id,
        web_id: req.body.web_id,
        username: req.body.web_id,
        password: password,
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

router.post("/addprofile", async (req, res) => {

    isProfileExist = await Profile.findOne({
        username: req.body.web_id,
    });

    if (isProfileExist) {
        return res.status(400).json({
            error: 'User has been created'
        });
    }

    // Hash Password
    var password = CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPT_KEY).toString();

    const profile = new Profile({
        id: req.body.id,
        username: req.body.web_id,
        password: password,
    });

    try {
        const savedprofile = await profile.save();
        res.status(200).json({
            data: savedprofile
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
    var bytes = CryptoJS.AES.decrypt(isAccountExist["password"], process.env.ENCRYPT_KEY);
    var originalpssword = bytes.toString(CryptoJS.enc.Utf8);
    isAccountExist["password"] = originalpssword;
    if (isAccountExist) {
        return res.status(200).json({
            data: isAccountExist
        });
    } else res.status(400).json({
        data: "Not found"
    });

});

router.post("/profile", async (req, res) => {
    isProfileExist = await Profile.findOne({
        id: req.body.id
    });
    var bytes = CryptoJS.AES.decrypt(isProfileExist["password"], process.env.ENCRYPT_KEY);
    var originalpssword = bytes.toString(CryptoJS.enc.Utf8);
    isProfileExist["password"] = originalpssword;
    if (isAccountExist) {
        return res.status(200).json({
            data: isProfileExist
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