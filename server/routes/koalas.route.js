const pool = require('../modules/pool');

const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    console.log('hit get koalas');

    const queryText = 'SELECT * FROM koala';
    pool.query(queryText)
        .then((result) => {
            console.log('query results:', result);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('error making query:', err);
            res.sendStatus(500);
        });
});

router.post('/', function(req, res) {
    const queryText = 'INSERT INTO koala (name, gender, age, ready_to_transfer, notes) VALUES ($1, $2, $3, $4, $5)';
    pool.query(queryText, [req.body.name, req.body.gender, req.body.age, req.body.ready_to_transfer, req.body.notes])
        .then((result) => {
            console.log('result:', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('error:', err);
            res.send(500);
        });
});

module.exports = router;