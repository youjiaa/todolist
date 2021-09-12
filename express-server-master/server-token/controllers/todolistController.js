const todolist = require('../models/schema/todolist');
const isVailToken = require('../tokenHandle/isVailToken');

const Addtodolist = (req, res) => {

  let todolistRegister = new todolist({
    title: req.body.title,
    content: req.body.content,
    userid: req.body.userid
  });

  todolistRegister.save((err, todolist) => {
    if (err) {
      res.json(err);
    } else {
      res.json(todolist);
    }
  });
};

const getTodo = (req, res) => {
  console.log({_id:req.params.id},"123")

  todolist.find({userid:req.params.userid})
    .then(list => {
      res.json(list);
    })
    .catch(err => res.json(err));
};

const delTodo = (req, res) => {
  todolist.remove({_id:req.params.id}).then(res=>{
    res.json({
      success: false,
      message: 'error in delete'
    });
  }).catch(err=>{
    res.json({
      success: true,
      message: 'successfully deleted'    
      });
  })
};

const updateTodolist = (req, res) => {
  User.update({_id:req.params.id},{title:req.body.title,content:req.body.content})
  .then(user => {
    res.json({
      success: true,
      message: 'successfully updated',
      data: user
    });
  })
  .catch(err => res.json(err));

}; 


module.exports = router => {
  router.post('/addtodolist', Addtodolist),
  router.get('/getTodo/:userid', isVailToken, getTodo);
  router.delete('/delTodo/:id', delTodo);
  router.put('/updateTodolist/:id',isVailToken, updateTodolist);
};
