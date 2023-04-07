import express from 'express';
const router = express.Router();
import Contact from '../models/contact';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page : 'home' , displayName: ''});
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page : 'home' , displayName: ''});
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Us', page : 'about' , displayName: ''});
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page : 'contact' , displayName: ''});
});

router.get('/contact-list', function(req, res, next) {
  Contact.find().then(function(contacts){
    res.render('index', {title: 'Contact List', page : 'contact-list', contacts : contacts,
      displayName : ''});
  }).catch(function(err){
    console.error("Encountered a problem reading contacts from the database");
    res.end(err);
  })
});

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services', page : 'services' , displayName: ''});
});

router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products', page : 'products' , displayName: ''});
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page : 'register' , displayName: ''});
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page : 'login' , displayName: ''});
});

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  Contact.findById(id).then(contactToEdit => {
    res.render('index', {
      title: 'Edit', page: 'edit', contact: contactToEdit, displayName: ''
    });
  }).catch(err => {
      console.error(err);
      res.end(err);
    });
});

router.get('/add', function(req, res, next) {
  res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: '' });
});

router.post('/add', function(req, res, next)
{

  const newContact =
  {
    "FullName": req.body.fullName,
    "ContactNumber": req.body.contactNumber,
    "EmailAddress": req.body.emailAddress
  };
  Contact.create(newContact).then((contact) =>
  {
    res.redirect('/contact-list');
  }).catch((err) => {
    res.end(err);
  })
});


router.post('/edit/:id', function(req, res, next)
{
  let id = req.params.id;


  let updatedContact = new Contact
  ({
    "_id": id,
    "FullName": req.body.fullName,
    "ContactNumber": req.body.contactNumber,
    "EmailAddress": req.body.emailAddress
  });


  Contact.updateOne({_id:id}, updatedContact).then(function(){
    res.redirect('/contact-list');
  }).catch(function(err)
  {
      console.error(err);
      res.end(err);
  });
});

router.get('/delete/:id', function(req, res, next)
{
  let id = req.params.id;


  Contact.deleteOne({_id: id}).then(function(){
    res.redirect('/contact-list');
  }).catch(function(err){
    console.error(err);
    res.end(err);
  });
});







export default router;