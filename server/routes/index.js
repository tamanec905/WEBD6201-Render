"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const contact_1 = __importDefault(require("../models/contact"));
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', displayName: '' });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: '' });
});
router.get('/contact-list', function (req, res, next) {
    contact_1.default.find().then(function (contacts) {
        res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts,
            displayName: '' });
    }).catch(function (err) {
        console.error("Encountered a problem reading contacts from the database");
        res.end(err);
    });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Services', page: 'services', displayName: '' });
});
router.get('/products', function (req, res, next) {
    res.render('index', { title: 'Products', page: 'products', displayName: '' });
});
router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: 'register', displayName: '' });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: 'login', displayName: '' });
});
router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id).then(contactToEdit => {
        res.render('index', {
            title: 'Edit', page: 'edit', contact: contactToEdit, displayName: ''
        });
    }).catch(err => {
        console.error(err);
        res.end(err);
    });
});
router.get('/add', function (req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: '' });
});
router.post('/add', function (req, res, next) {
    const newContact = {
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    };
    contact_1.default.create(newContact).then((contact) => {
        res.redirect('/contact-list');
    }).catch((err) => {
        res.end(err);
    });
});
router.post('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    let updatedContact = new contact_1.default({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    contact_1.default.updateOne({ _id: id }, updatedContact).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end(err);
    });
});
router.post('/delete/:id', function (req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id).then(function (contact) {
        if (!contact) {
            res.status(404).send("Contact not found");
        }
        else {
            contact.deleteOne().then(function () {
                res.redirect('/contact-list');
            }).catch(function (err) {
                console.error(err);
                res.end(err);
            });
        }
    }).catch(function (err) {
        console.error(err);
        res.end(err);
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map