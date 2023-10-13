const mongoose = require('mongoose');

mongoose.set("strictQuery" , false);
module.exports = mongoose.connect('mongodb+srv://wequarmlg:JvNamQMEMIFoKHi4@cluster0.bbreux2.mongodb.net/MEAN_STACK', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then((success) => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log("Database isn't connected successfully.");
    })