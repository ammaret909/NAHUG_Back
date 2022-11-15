const express = require('express');

const Cat = require('../model/cat');

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await Cat.find({ email: req.body.email })
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const catId = (req.params.id);
    const cat = await Cat.find({ email: req.body.email, _id: catId })
    res.json(cat);
});

router.post("/", async (req, res) => {
    try {
        const { name, email, year, month, weight } = req.body;
        if (!(email && name && year && month && weight)) {
            res.status(404).send("All input is required");
        }

        const cat = await Cat.create({
            name,
            email: email.toLowerCase(),
            year,
            month,
            weight,
            vaccine: {}
        })

        res.status(201).json(cat);
    } catch (err) {
        console.log(err);
    }
});

router.put('/:id', async (req, res) => {
    const catId = (req.params.id);
    const query = { _id: catId };
    const { name, year, month, weight } = req.body;
    const data = {
        $set: {
            "name": name,
            "year": year,
            "month": month,
            "weight": weight
        }
    }

    const result = await Cat.updateOne(query, data);
    console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
    const catId = (req.params.id);
    const query = { _id: catId };
    const result = await Cat.deleteOne(query);
    if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
    }
    res.sendStatus(204);
});

module.exports = router;