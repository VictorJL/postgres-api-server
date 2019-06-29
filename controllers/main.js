const getUsersTableData = (req, res, db) => {
  db.select('*').from('Users')
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
  db('Users').insert({first, last, email, phone, location, hobby, added})
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
  db('Users').where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteUsersTableData = (req, res, db) => {
  const { id } = req.body
  db('Users').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const getTasksTableData = (req, res, db) => {
  db.select('*').from('Tasks')
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

  db('Tasks').insert({name, action })
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
  const { id, name, action } = req.body
  db('Tasks').where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTasksTableData = (req, res, db) => {
  const { id } = req.body
  db('Tasks').where({id}).del()
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