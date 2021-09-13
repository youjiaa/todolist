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
  todolist.find({userid:req.params.userid})
    .then(list => {
      res.json({
        success: true,
        message: 'success',
        data: list
      });
    })
    .catch(err => res.json(err));
};


const getTodoByid = (req, res) => {
  todolist.findOne({_id:req.params.id})
    .then(list => {
      res.json({
        success: true,
        message: 'success',
        data: list
      });
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
      message: 'success delete'    
      });
  })
   
};

const updateTodolist = (req, res) => {
  todolist.update({_id:req.params.id},{title:req.body.title,content:req.body.content})
  .then(todolist => {
    res.json({
      success: true,
      message: 'success update',
      data: todolist
    });
  })
  .catch(err => res.json(err));

}; 


module.exports = router => {
  router.post('/addtodolist', Addtodolist),
  router.post('/getTodo/:userid', isVailToken, getTodo);
  router.post('/getTodoByid/:id', isVailToken, getTodoByid);
  router.delete('/delTodo/:id', delTodo);
  router.put('/updateTodolist/:id',isVailToken, updateTodolist);
};
