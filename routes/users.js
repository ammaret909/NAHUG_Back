const express = require('express');

const User = require('../model/user');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const userId = (req.params.id);
    const result = await User.findById({ _id: userId })
    res.json(result);
});

router.get('/:id/cats/', async (req, res) => {
    const userId = (req.params.id);
    const result = await User.findById({ _id: userId })
    res.send(result.cats);
});

router.get('/:id/cats/:catId', async (req, res) => {
    const userId = (req.params.id);
    const catId = (req.params.catId);
    const result = await User.findOne({ _id: userId }, { cats: { "$elemMatch": { _id: catId } } })
    res.send(result.cats);
});

router.post("/:id/cats/", async (req, res) => {
    try {
        const userId = (req.params.id);
        const query = { _id: userId };
        const { name, year, month, weight } = req.body;
        if (!(name && year && month && weight)) {
            res.status(404).send("All input is required");
        }

        const options = {
            new: true,
            upsert: true,
        };

        const user = await User.findOneAndUpdate(
            query,
            {
                $push: {
                    cats: {
                        name,
                        year,
                        month,
                        weight,
                    }
                }
            },
            options).lean().exec();
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

router.post("/:id/cats/:catId", async (req, res) => {
    try {
        const userId = (req.params.id);
        const catId = (req.params.catId);
        const { name, date, times } = req.body;
        if (!(name && date && times)) {
            res.status(404).send("All input is required");
        }

        const vac = await User.updateOne(
            {
                _id: userId,
                "cats._id": catId,
            },
            {
                $push: {
                    "cats.$.vaccine": {
                        name,
                        date,
                        times
                    }
                }
            },
            { new: true });
        res.status(201).json(vac);
    } catch (err) {
        console.log(err);
    }
});

router.put('/:id/cats/:catId', async (req, res) => {
    const userId = (req.params.id);
    const catId = (req.params.catId);
    const { name, year, month, weight } = req.body;

    const cat = await User.updateOne(
        {
            _id: userId,
            "cats._id": catId,
        },
        {
            $set: {
                "cats.$.name": name,
                "cats.$.year": year,
                "cats.$.weight": weight,
                "cats.$.month": month,
            }
        });
    console.log(
        `${cat.matchedCount} document(s) matched the filter, updated ${cat.modifiedCount} document(s)`,
    );
    res.send(cat);
    res.sendStatus(200);
});

router.put('/:id/cats/:catId/vac/:vacId', async (req, res) => {
    const userId = (req.params.id);
    const catId = (req.params.catId);
    const vacId = (req.params.vacId);
    const { name, date, times } = req.body;

    const cat = await User.updateOne(
        {
            _id: userId,
            'cats': {
                '$elemMatch': {
                    '_id': catId,
                    "vaccine._id": vacId
                }
            }
        },
        {
            $set: {
                "cats.$[outer].vaccine.$[inner].name": name,
                "cats.$[outer].vaccine.$[inner].date": date,
                "cats.$[outer].vaccine.$[inner].times": times,
            }
        },
        {
            arrayFilters: [
                { "outer._id": catId },
                { "inner._id": vacId }
            ]
        });

    return res.json(cat);
});

router.delete('/:id/cats/:catId', async (req, res) => {
    try {
        const userId = (req.params.id);
        const query = { _id: userId };

        const result = await User.updateOne(
            query,
            {
                $pull: {
                    cats: {
                        _id: req.params.catId
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

router.delete('/:id/cats/:catId/vac/:vacId', async (req, res) => {
    try {
        const userId = (req.params.id);
        const catId = (req.params.catId);
        const vacId = (req.params.vacId);

        const result = await User.updateOne(
            {
                _id: userId,
                'cats': {
                    '$elemMatch': {
                        '_id': catId,
                        "vaccine._id": vacId
                    }
                }
            },
            {
                $pull: {
                    "cats.$[outer].vaccine": {
                        _id: vacId,
                    }
                }
            },
            {
                arrayFilters: [
                    { "outer._id": catId }
                ]
            });
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;