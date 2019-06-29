const getUsersTableData = (req, res, db) => {
  db.select('*').from('users')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postUsersTableData = (req, res, db) => {
  const { first, last, email, phone, location, hobby } = req.body
  const added = new Date()
  db('users').insert({first, last, email, phone, location, hobby, added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(function(err){
      console.log(err);
      res.status(400).json({dbError: 'db error'})
    })
}

const putUsersTableData = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.body
  db('users').where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteUsersTableData = (req, res, db) => {
  const { id } = req.body
  db('users').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const getTasksTableData = (req, res, db) => {
  db.select('*').from('tasks')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTasksTableData = (req, res, db) => {
  const { name, action } = req.body

  db('tasks').insert({name, action })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(function(err){
      console.log(err);
      res.status(400).json({dbError: 'db error'})
    })
}

const putTasksTableData = (req, res, db) => {
  const { id, name, action } = req.body
  db('tasks').where({id}).update({ name, action })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTasksTableData = (req, res, db) => {
  const { id } = req.body
  db('tasks').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}


module.exports = {
  getUsersTableData,
  postUsersTableData,
  putUsersTableData,
  deleteUsersTableData,

  getTasksTableData,
  postTasksTableData,
  putTasksTableData,
  deleteTasksTableData
}