const express = require('express');

const users = require('../data/users');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    res.json(user);
});

router.get('/:id/cats/:catId', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);

    const catsData = user.cats;

    const catId = Number.parseInt(req.params.catId);
    const cat = catsData.find((cat) => cat.id === catId);
    res.json(cat);
});

let currentId = 2;
router.post('/', (req, res) => {
    const { username, password, name, email, permissionLevel, cats } = req.body;
    const user = {
        id: ++currentId,
        username,
        password,
        name,
        email,
        permissionLevel,
        cats,
    };
    users.push(user);
    res.json(users);
    res.sendStatus(201);
});

let catId = 0;
router.post('/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);

    const { name, year, month, weight } = req.body;
    const data = {
        id: ++catId,
        name,
        year,
        month,
        weight,
        food: "",
        vaccine: [],
    };

    user.cats.push(data);
    res.json(users);
});

let vaccineID = 0;
router.post('/:id/cats/:catId', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);

    const catsData = user.cats;

    const catId = Number.parseInt(req.params.catId);
    const cat = catsData.find((cat) => cat.id === catId);

    const { name, date, times } = req.body;
    const data = {
        id: ++vaccineID,
        name,
        times,
        date
    };

    console.log(cat);
    cat.vaccine.push(data);
    res.json(user);
    res.sendStatus(201);
});


router.put('/:id', (req, res) => {
    const { username, password, name, email, permissionLevel, cats } = req.body;
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);

    user.username = username;
    user.password = password;
    user.fname = name;
    user.email = email;
    user.permissionLevel = permissionLevel;
    user.cats = cats;

    res.json(user);
})

router.put('/:id/cats/:catId', (req, res) => {
    const { name, year, month, weight } = req.body;
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);

    const catsData = user.cats;

    const catId = Number.parseInt(req.params.catId);
    const cat = catsData.find((cat) => cat.id === catId);

    cat.name = name;
    cat.year = year;
    cat.month = month;
    cat.weight = weight;

    res.json(user);
})

router.delete('/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);
    users.splice(userIndex, 1);
    res.json(users);
    res.sendStatus(204);
});

router.delete('/:id/cats/:catId', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    const userIndex = users.findIndex((user) => user.id === userId);

    const catsData = user.cats;

    const catId = Number.parseInt(req.params.catId);
    const catIndex = catsData.findIndex((cat) => cat.id === catId);
    users[userIndex].cats.splice(catIndex, 1);
    res.json(user);
    res.sendStatus(204);
});

router.delete('/:id/cats/:catId/vaccine/:vacId', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    const userIndex = users.findIndex((user) => user.id === userId);

    const catsData = user.cats;

    const catId = Number.parseInt(req.params.catId);
    const cat = catsData.find((cat) => cat.id === catId);
    const catIndex = catsData.findIndex((cat) => cat.id === catId);

    const vaccineData = cat.vaccine;

    const vacId = Number.parseInt(req.params.vacId);
    const vacIndex = vaccineData.findIndex((vaccine) => vaccine.id === vacId);
    users[userIndex].cats[catIndex].vaccine.splice(vacIndex, 1);
    res.json(user);
    res.sendStatus(204);
});

module.exports = router;