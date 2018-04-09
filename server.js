'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');
var User = require('./model/users');
var Group = require('./model/groups');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

//db config
var mongoDB = 'mongodb://Jab123:softcoop1@ds125113.mlab.com:25113/test1';
mongoose.connect(mongoDB)
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    //now we should configure the API to use bodyParser and look for JSON data in the request body
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

        //and remove cacheing so we get the most recent comments
        res.setHeader('Cache-Control', 'no-cache');
        next();
    });

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

//adding the /comments router to our /api router
router.route('/comments')
//retrieve all comments from the database
.get(function(req, res) {
    //looks at our comment schema
    Comment.find(function(err, comments) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(comments)
    });
})
//post new comments to the database
.post(function(req, res) {
    var comment = new Comment();
    //body parser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Comment successfully added!' });
    });
});

router.route('/comments/:comment_id')
//The put method gives us the chance to update our comment based on
//the ID passed to the route
 .put(function(req, res) {
      Comment.findById(req.params.comment_id, function(err, comment) {
          if (err)
            res.send(err);
          //setting the new author and text to whatever was changed. If
          //nothing was changed we will not alter the field.
          (req.body.author) ? comment.author = req.body.author : null;
          (req.body.text) ? comment.text = req.body.text : null;
          //save comment
          comment.save(function(err) {
              if (err)
                  res.send(err);
                  res.json({ message: 'Comment has been updated' });
          });
      });
 })
 //delete method for removing a comment from our database
 .delete(function(req, res) {
 //selects the comment by its ID, then removes it.
      Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
          if (err)
              res.send(err);
          res.json({ message: 'Comment has been deleted' })
      })
 });

router.route('/users')
//retrieve all users from the database
  .get(function(req, res) {
      //looks at our user schema
      User.find(function(err, users) {
          if (err)
              res.send(err);
              //responds with a json object of our database users.
          res.json(users)
      });
})
//post new users to the database
.post(function(req, res) {
    var user = new User();
    //body parser lets us use the req.body
    user.name = req.body.name;
    user.password = req.body.password;

    user.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully added!' });
    });
});

router.route('/users/:user_id')
//The put method gives us the chance to update our comment based on
//the ID passed to the route
 .put(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
          if (err)
            res.send(err);
          //setting the new author and text to whatever was changed. If
          //nothing was changed we will not alter the field.
          (req.body.name) ? user.name = req.body.name : null;
          (req.body.password) ? user.password = req.body.password : null;
          //save comment
          user.save(function(err) {
              if (err)
                  res.send(err);
                  res.json({ message: 'User has been updated' });
          });
      });
 })
 //delete method for removing a comment from our database
 .delete(function(req, res) {
 //selects the comment by its ID, then removes it.
      User.remove({ _id: req.params.user_id }, function(err, user) {
          if (err)
              res.send(err);
          res.json({ message: 'User has been deleted' })
      })
 });

 router.route('/groups')

  .get(function(req, res) {

    Group.find(function(err, groups) {
      if (err)
        res.send(err)
      res.json(groups)
    });
  })

  .post(function(req, res) {
    var group = new Group();

    group.name = req.body.name;
    group.description = req.body.description;
    group.img = req.body.img

    group.save(function(err) {
      if (err)
        res.send(err)
      res.json({ message: 'Group successfully added!' });
    });
  });

router.route('/groups/:group_id')

  .put(function(req, res) {
    Group.findById(req.params.group_id, function(err, group) {
        if (err)
          res.send(err);
        //setting the new author and text to whatever was changed. If
        //nothing was changed we will not alter the field.
        (req.body.name) ? group.name = group.body.name : null;
        (req.body.description) ? group.description = req.body.description : null;
        (req.body.img) ? group.img = req.body.img : null;
        //save comment
        group.save(function(err) {
            if (err)
                res.send(err);
                res.json({ message: 'Group has been updated' });
        });
     });
  })
  .delete(function(req, res) {
  //selects the comment by its ID, then removes it.
       Group.remove({ _id: req.params.group_id }, function(err, group) {
           if (err)
               res.send(err);
           res.json({ message: 'Group has been deleted' })
       })
  });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});
