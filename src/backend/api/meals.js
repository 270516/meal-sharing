const express = require ("express");
const router = express.Router();
const knex = require("../database");
const { response } = require("../app");

//GET	Returns all meals
router.get('/', async (req, res) => {
    try {
        const meals = await knex.select().from('meal');
        res.json(meals);
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});

//POST	Adds a new meal to the database
router.post('/', async (req, res) => {
    const { title, description, price} = req.body;
    try {
        const newMealId = await knex('meal').insert({ title, description, price});
        const newMeal = await knex.select().from('meal').where('id', newMealId).first();
        res.status(201).json(newMeal);
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});

//GET	Returns the meal by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const meal = await knex.select().from('meal').where('id', id).first();
        if (meal) {
            res.json(meal);
        } else {
            res.status(404).json({message: 'Meal not found'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});

//PUT	Updates the meal by id
router.put('/;id', async (req, res) => {
    const id = req.params.id;
    const { title, description, price} = req.body;
    try {
        await knex('meal').where('id', id).update({ title, description, price});
        const updatedMeal = await knex.select().from('meal').where('id', id).first();
        if (updatedMeal) {
            res.json(updatedMeal)
        } else {
            res.status(404).json({message: 'Meal not found'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
});

//DELETE	Deletes the meal by id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleteCount = await knex('meal').where('id', id).del()
    }
})




module.exports = router;
