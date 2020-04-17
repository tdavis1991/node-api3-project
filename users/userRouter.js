const express = require('express');
const users = require('./userDb');

const router = express.Router();

router.post('/', validateUserData(), (req, res) => {
  // do your magic!
  users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      next(err)
    })
});

router.post('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      next(err)
    })
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      next(err)
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
      res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      next(err)
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.remove(req.params.id)
    .then(user => {
      res.status(200).json({
        message: 'User removed'
      })
    })
    .catch(err => {
      next(err)
    })
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      next(err)
    })
});

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    users.getById(req.params.id) 
      .then(user => {
        if(user) {
          req.user = user

          next()
        }else {
          res.status(404).json({
            message: 'User not found'
          })
        }
      })
  }
}

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    if(!req.body) {
      res.status(400).json({
        message: 'Missing information'
      })
    }
    next()
  }
}

function validatePost() {
  // do your magic!
  return (req, res, next) => {
    if(!req.body) {
      res.status(400).json({
        message: 'Missing post data'
      })
    }
    next()
  }
}



module.exports = router;
