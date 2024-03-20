const database = require("../../database");

const getUsers = (req, res) => {
    let sql = "SELECT * FROM users ";
    const sqlValues =  [];

    if (req.query.language != null){
        sql += " WHERE language = ?";
        sqlValues.push(req.query.language);

        if (req.query.city != null){
            sql += " and city = ?";
            sqlValues.push(req.query.city);
        }

    } else if (req.query.city != null){
        sql += " WHERE city = ?";
        sqlValues.push(req.query.city);
    }

    database
     .query(sql, sqlValues)
     .then(([users]) => {
        res.json(users);
     })
     .catch(([err]) =>{
        console.error(err);
        res.sendStatus(500);
     })
}
 

const getUserId = (req, res) =>{
    const id = parseInt(req.params.id);
    database
     .query('SELECT * FROM users WHERE id= ?', [id])
     .then(([users]) => {
        if (users[0] != null){
            res.json(users[0]);
        } else {
            res.sendStatus(404);
        }
     })
     .catch(([err]) => {
        console.error(err);
        res.sendStatus(500);
     })
}
    
module.exports = {
    getUsers,
    getUserId,
}

