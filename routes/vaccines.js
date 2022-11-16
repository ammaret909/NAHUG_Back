const express = require('express');

const Vaccine = require('../model/vaccine');

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await Vaccine.find({});
    res.send(result);
});

router.get('/:name', async (req, res) => {
    const vacName = (req.params.name);
    const vac = await Vaccine.find({ name: vacName });
    res.json(vac);
});

// router.get('/:brand/:id', (req, res) => {
//     const foodId = (req.params.brand);
//     const food = foods.find((food) => food.brand === foodId);

//     const formularData = food.formular;

//     const formularId = Number.parseInt(req.params.id);
//     const formular = formularData.find((food) => food.id === formularId);
//     res.json(formular);
// });

router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        if (!(name)) {
            res.status(404).send("All input is required");
        }

        const vac = await Vaccine.create({
            name: name,
        })

        res.status(201).json(vac);
    } catch (err) {
        console.log(err);
    }
});

router.post('/:id', async (req, res) => {
    try {
        const vacId = (req.params.id);
        const query = { _id: vacId };
        const { cat_month, month, times } = req.body;
        if (!(cat_month && month && times)) {
            res.status(404).send("All input is required");
        }
        const options = {
            new: true,
            upsert: true,
        };

        const result = await Vaccine.findOneAndUpdate(
            query,
            {
                $push: {
                    type: {
                        cat_month: cat_month,
                        month: month,
                        times: times
                    }
                }
            },
            options).lean().exec();
        res.json(result);
    } catch (err) {
        console.log(err);
    }
});

router.put('/:id', async (req, res) => {
    const { name } = req.body;
    const vacId = (req.params.id);
    const query = { _id: vacId };

    const data = {
        $set: {
            "name": name
        }
    }

    const result = await Vaccine.updateOne(query, data);
    console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    res.sendStatus(200);
})

router.put('/:id/:type', async (req, res) => {
    try {
        const { cat_month, month, times } = req.body;
        const vacId = (req.params.id);

        const result = await Vaccine.updateOne(
            {
                _id: vacId,
                "type._id": req.params.type
            }
            ,
            {
                $set: {
                    "type.$.cat_month": cat_month,
                    "type.$.month": month,
                    "type.$.times": times,
                }
            }
        )
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:id', async (req, res) => {
    const vacId = (req.params.id);
    const query = { _id: vacId };
    const result = await Vaccine.deleteOne(query);
    if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
    }
    res.sendStatus(204);
});

router.delete('/:id/:type', async (req, res) => {
    try {
        const vacId = (req.params.id);
        const query = { _id: vacId };

        const result = await Vaccine.updateOne(
            query,
            {
                $pull: {
                    type: {
                        _id: req.params.type
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