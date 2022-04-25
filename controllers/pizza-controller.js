const { Pizza } = require('../models');
const { db } = require('../models/Pizza');
const pizzaController = {
    //functions will go in here as methods
    getAllPizza(req, res) {
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    // get pizzas by one ID 
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .then(dbPizzaData => {
            // if no pizza is found, send 404
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No Pizza found with this ID'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //create pizza
    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    //update pizza by id
    updatePizza({ params, body}, res){
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(400).json({ message: "no pizza with this ID found!!"});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch( err => res.status(400).json(err));
    },
    // delete pizza 
    deletePizza ({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id})
        .then(dbPizzaData => {
            if (!dbPizzaData){
                res.status(404).json({ message: 'No Pizza found with this ID '})
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;
