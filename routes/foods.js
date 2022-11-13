const express = require('express');

const foods = require('../data/foods');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(foods);
});

router.get('/:brand', (req, res) => {
    const foodId = (req.params.brand);
    const food = foods.find((food) => food.brand === foodId);
    res.json(food);
});

router.get('/:brand/:id', (req, res) => {
    const foodId = (req.params.brand);
    const food = foods.find((food) => food.brand === foodId);

    const formularData = food.formular;

    const formularId = Number.parseInt(req.params.id);
    const formular = formularData.find((food) => food.id === formularId);
    res.json(formular);
});

let currentId = 2;
router.post('/', (req, res) => {
    const { brand, description } = req.body;
    const food = {
        id: ++currentId,
        brand,
        description,
        formular: [],
    };
    foods.push(food);
    res.json(foods);
    res.sendStatus(201);
});


let formularId = 0;
router.post('/:brand', (req, res) => {
    const foodId = (req.params.brand);
    const food = foods.find((food) => food.brand === foodId);

    const { name, description } = req.body;
    const data = {
        id: ++formularId,
        name,
        description,
    };

    food.formular.push(data);
    res.json(foods);
});


router.put('/:brand', (req, res) => {
    const { brand, description } = req.body;
    const foodId = (req.params.brand);
    const food = foods.find((food) => food.brand === foodId);

    food.brand = brand;
    food.description = description;

    res.json(food);
})

router.put('/:brand/:id', (req, res) => {
    const foodId = (req.params.brand);
    const food = foods.find((food) => food.brand === foodId);

    const formularData = food.formular;

    const formularId = Number.parseInt(req.params.id);
    const formular = formularData.find((food) => food.id === formularId);

    const { name, description } = req.body;
    formular.name = name;
    formular.description = description;

    res.json(food);
})

router.delete('/:brand', (req, res) => {
    const foodId = (req.params.brand);
    const food = foods.findIndex((food) => food.brand === foodId);

    foods.splice(food, 1);
    res.json(foods);
    res.sendStatus(204);
});

router.delete('/:brand/:id', (req, res) => {
    const foodId = (req.params.brand);
    const food = foods.find((food) => food.brand === foodId);
    const foodIndex = foods.findIndex((food) => food.brand === foodId);

    const formularData = food.formular;

    const formularId = Number.parseInt(req.params.id);
    const formularIndex = formularData.findIndex((food) => food.id === formularId);

    foods[foodIndex].formular.splice(formularIndex, 1);
    res.json(foods);
    res.sendStatus(204);
});

module.exports = router;