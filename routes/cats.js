const express = require('express');

const Cat = require('../model/cat');

const router = express.Router();

router.get('/', async (req, res) => {
    const email = req.user.email;
    const result = await Cat.find({ email: email })
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const email = req.user.email;
    const catId = (req.params.id);
    const cat = await Cat.findOne({ email: email, _id: catId })
    res.json(cat);
});

router.post("/", async (req, res) => {
    try {
        const mail = req.user.email;
        const { name, year, month, weight } = req.body;
        if (!(name && year && month && weight)) {
            res.status(404).send("All input is required");
        }

        const cat = await Cat.create({
            name,
            email: mail.toLowerCase(),
            year,
            month,
            weight
        })

        res.status(201).json(cat);
    } catch (err) {
        console.log(err);
    }
});

router.post("/:id", async (req, res) => {
    try {
        const catId = (req.params.id);
        const { name, date, times } = req.body;
        if (!(name && date && times)) {
            res.status(404).send("All input is required");
        }

        const options = {
            new: true,
            upsert: true,
        };

        const cat = await Cat.findOneAndUpdate(
            {
                _id: catId
            },
            {
                $push: {
                    vaccine: {
                        name,
                        date,
                        times
                    }
                }
            },
            options).lean().exec();
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

router.put('/:id/vaccine/:vacId', async (req, res) => {
    const catId = (req.params.id);
    const vacId = (req.params.vacId);
    const { name, date, times } = req.body;
    const cat = await Cat.updateOne(
        {
            _id: catId,
            "vaccine._id": vacId,
        },
        {
            $set: {
                "vaccine.$.name": name,
                "vaccine.$.date": date,
                "vaccine.$.times": times,
            }
        });

    console.log(
        `${cat.matchedCount} document(s) matched the filter, updated ${cat.modifiedCount} document(s)`,
    );
    res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
    const catId = (req.params.id);
    const query = { _id: catId };
    const result = await Cat.deleteOne(query);
    if (result.deletedCount === 1) {
        res.send("Successfully deleted one document.");
    } else {
        res.send("No documents matched the query. Deleted 0 documents.");
    }
    res.sendStatus(204);
});

router.delete('/:id/vaccine/:vacId', async (req, res) => {
    try {
        const catId = (req.params.id);
        const query = { _id: catId };

        const result = await Cat.updateOne(
            query,
            {
                $pull: {
                    vaccine: {
                        _id: req.params.vacId
                    }
                }
            },
            { multi: true }
        )
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;