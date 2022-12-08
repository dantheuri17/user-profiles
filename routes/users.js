var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;


/* Upload Files */
const multer = require('multer')
const uuid = require('uuid').v4
const upload = multer({ dest: 'uploads/' })


/* GET users listing. */

router.get('/', function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/login');
  }
  const users = req.app.locals.users;
  const _id = ObjectID(req.session.passport.user);

  users.findOne({ _id }, (err, results) => {
    if (err) {
      throw err;
    }

    res.render('account', { ...results });
  });
});


router.get('/:username', (req, res, next) => {
  const users = req.app.locals.users;
  const username = req.params.username;

  users.findOne({ username }, (err, results) => {
    if (err || !results) {
      res.render('public-profile', { messages: { error: ['User not found'] } });
    }

    res.render('public-profile', { ...results, username });
    console.log(results)
  });
})

router.post('/', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/login');
  }

  const users = req.app.locals.users;
  const { university, email, location, facebook } = req.body;
  const _id = ObjectID(req.session.passport.user);

  users.updateOne({ _id }, { $set: { university, email, location, facebook } }, (err) => {
    if (err) {
      throw err;
    }

    res.redirect('/users');
  });
});

router.post('/upload_files', upload.array('files'), (req, res) => {

  const users = req.app.locals.users;
  const _id = ObjectID(req.session.passport.user)

  uploadFiles
  console.log(req.files)
  const transcripts = req.files;
  users.updateOne({ _id }, { $set: { transcripts } }, (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/users')
  })

})


function uploadFiles(req, res) {
  console.log(req.files)

}
module.exports = router;
