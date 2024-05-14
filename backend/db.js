const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://maurya3267969:maurya3267969@cluster0.gamj16r.mongodb.net/nutrifood?retryWrites=true&w=majority'

const mongoDB = async () => {

    mongoose.set('strictQuery', false)
    await mongoose.connect(mongoURI, async (err, result) => {

        if (err) console.log("---", err)

        else {

            console.log("connected");
            const fetched_data = mongoose.connection.db.collection("food_items")
            fetched_data.find({}).toArray(function (err, data) {

                const foodCategory = mongoose.connection.db.collection("food_category")

                foodCategory.find({}).toArray(function (err, catData) {

                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }


                })

            })
        }
    });
}

module.exports = mongoDB;



