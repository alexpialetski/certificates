const express = require('express');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const models = require('./models');

let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);
    mdb = client.db('certificates');
});

const router = express.Router();

router.get('/certificates', (req, res) => {
    let certificates = [];
    mdb.collection('certificates').find({})
        .project(models.certificate)
        .each((err, contest) => {
            assert.equal(null, err);

            if (!contest) { // no more contests
                res.send(certificates);
                return;
            }

            certificates.push(contest);
        });
});

router.post('/users/authenticate', (req, res) => {
    mdb.collection('users')
        .findOne({username: req.body.username, password: req.body.password})
        .then(user => {
            res.send(user)
        })
        .catch(error => {
            console.error(error);
            res.status(404).send('Bad Request');
        });
});

router.post('/users/register', (req, res) => {
    const {body} = req;
    console.log('okay');
    mdb.collection('users')
        .insert({username: body.username, password: body.password, firstName: body.firstName, lastName: body.lastName, role: 'USER'})
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            console.error(error);
            res.status(404).send('Bad Request');
        });
});


module.exports = router;
