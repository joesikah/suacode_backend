const express = require('express');
const Model = require('../models/model');
const router = express.Router()


//Post Method
router.post('/post-story', (req, res) => {
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
router.get('/get-stories', async (req, res) => {
    try {
        const filter = req.query;

        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        if (isEmpty(filter)) {
            const data = await Model.find();
            res.send({
                status: 'success',
                message: 'All stories retrieved successfully',
                payload: data,
                total: data.length
            });
        }
        else {
            const filteredData = await Model.find(filter);

            console.log(filter)

            res.send({
                status: 'success',
                message: 'Filtered stories retrieved successfully',
                payload: filteredData,
                total: filteredData.length
            });
        }

    }
    catch (error) {
        res.send({
            status: 'error',
            message: error.message
        });
    }
})




//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})




//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send({
            status: 'success',
            message: 'Story deleted successfully',
            payload: data
        });
    }
    catch (error) {
        res.send({
            status: 'error',
            message: error.message
        });
    }
})

module.exports = router;