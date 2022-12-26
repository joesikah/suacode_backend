const mongoose = require('mongoose');

const PostStorySchema = new mongoose.Schema({
    // Define the fields for your model here
    title: String,
    body: String,
    dateCreated: String,
    dateUpdated: String
});

module.exports = mongoose.model('UserStories', PostStorySchema);
