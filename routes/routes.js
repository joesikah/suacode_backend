const express = require('express');
const Model = require('../models/model');
const router = express.Router()


//Post Method
router.post('/post', (req, res) => {
    const data = new Model({
        title: req.body.title,
        body: req.body.body,
        dateCreated: req.body.dateCreated,
        dateUpdated: req.body.dateUpdated,
    })
    try {
        Model.findOne({ title: req.body.title }, (error, found) => {
            if (error) {
                res.send(error);
            }
            else {
                if (found) {
                    res.send({
                        status: 'error',
                        message: 'Document already exists'
                    });
                }
                else {
                    data.save();
                    res.send({
                        status: 'success',
                        message: 'Story created successfully',
                        payload: data
                    });
                }
            }
        });
    }
    catch (error) {
        res.send({
            status: 'error',
            message: error.message
        });
    }
})


//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;