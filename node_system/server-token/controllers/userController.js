const User = require('../models/schema/user');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const sha1 = require('sha1');
const addTokenList = require('../tokenHandle/addTokenList');
const isVailToken = require('../tokenHandle/isVailToken');

const addUser = (req, res) => {
  let userRegister = new User({
    name: req.body.name,
    usertype:req.body.type,
    password: sha1(req.body.password),
    token: addTokenList(this.name)
  });

  userRegister.create_time = moment(
    objectIdToTimestamp(userRegister._id)
  ).format('YYYY-MM-DD HH:mm:ss');

  User.findOne({
    name: userRegister.name.toLowerCase()
  })
    .then(user => {
      if (user) {
        res.json({
          success: false,
          message: 'name is taken'
        });
      } else {
        userRegister.save((err, user) => {
          if (err) {
            res.json(err);
          } else {
            res.json(user);
          }
        });
      }
    })
    .catch(err => res.json(err));
};

const delUser = (req, res) => {
  console.log({_id:req.params.id},"123")
  User.remove({_id:req.params.id}).then(res=>{
    res.json({
      success: false,
      message: 'error in delete'
    });
  }).catch(err=>{
    res.json({
      success: true,
      message: 'success delete'    
      });
  })
   
};


const Register = (req, res) => {
  let userRegister = new User({
    name: req.body.name,
    password: sha1(req.body.password),
    usertype:req.body.type,
    token: addTokenList(this.name)
  });

  userRegister.create_time = moment(
    objectIdToTimestamp(userRegister._id)
  ).format('YYYY-MM-DD HH:mm:ss');

  User.findOne({
    name: userRegister.name.toLowerCase()
  })
    .then(user => {
      if (user) {
        res.json({
          success: false,
          message: 'name is taken'
        });
      } else {
        userRegister.save((err, user) => {
          if (err) {
            res.json(err);
          } else {
            res.json(user);
          }
        });
      }
    })
    .catch(err => res.json(err));
};

const Login = (req, res) => {
  let userLogin = new User({
    name: req.body.name,
    password: sha1(req.body.password),
    token: addTokenList(this.name)
  });
  User.findOne({
    name: userLogin.name
  })
    .then(user => {
      if (!user) {
        res.json({
          success: false,
          message: 'account doesnt exist'
        });
      } else if (userLogin.password === user.password) {
        var name = req.body.name;
        res.json({
          success: true,
          type: user.usertype,
          message: 'success login',
          userid: user._id,
          name: name,
          token: addTokenList(name),
        });
      } else {
        res.json({
          success: false,
          message: 'wrong password'
        });
      }
    })
    .catch(err => res.json(err));
};

const AllUser = (req, res) => {
  User.find()
    .then(user => {
      res.json({
        success: true,
        message: 'success',
        data: user
      });
    })
    .catch(err => res.json(err));
};

const updateUser = (req, res) => {
  User.findOne({
    name: req.body.name
  })
    .then(user => {
      if (!user) {
        User.update({_id:req.params.id},{usertype:req.body.type,name:req.body.name})
        .then(user => {
          res.json({
            success: true,
            message: 'success update',
            data: user
          });
        })
        .catch(err => res.json(err));
      } else {
        res.json({
          success: false,
          message: 'name already exist'
        });
      }
    })
    .catch(err => res.json(err));

}; 



module.exports = router => {
  router.post('/login', Login),
  router.post('/register', Register),
  router.post('/addUser', isVailToken,addUser),
  router.post('/AllUser', isVailToken, AllUser);
  router.put('/updateUser/:id', isVailToken, updateUser);
  router.delete('/delUser/:id', delUser);
};
