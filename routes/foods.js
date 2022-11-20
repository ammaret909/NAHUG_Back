const express = require('express');

const Food = require('../model/food');

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await Food.find();
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const foodId = (req.params.id);
    const food = await Food.findOne({ _id: foodId });
    res.json(food);
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
        const { name, description } = req.body;
        if (!(name && description)) {
            res.status(404).send("All input is required");
        }

        const food = await Food.create({
            name,
            description,
            formular: {}
        })

        res.status(201).json(food);
    } catch (err) {
        console.log(err);
    }
});

router.post('/:id', async (req, res) => {
    try {
        const foodId = (req.params.id);
        const query = { _id: foodId };
        const { form_name, form_description } = req.body;
        if (!(form_name && form_description)) {
            res.status(404).send("All input is required");
        }

        const options = {
            new: true,
            upsert: true,
        };

        const result = await Food.findOneAndUpdate(
            query,
            {
                $push: {
                    formular: {
                        form_name: form_name,
                        form_description: form_description,
                    }
                }
            },
            options).lean().exec();
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});


router.put('/:id', async (req, res) => {
    const { name, description } = req.body;
    const foodId = (req.params.id);
    const query = { _id: foodId };

    const data = {
        $set: {
            "name": name,
            "description": description,
        }
    }

    const result = await Food.updateOne(query, data);
    console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    res.sendStatus(200);
})

router.put('/:id/:formId', async (req, res) => {
    try {
        const { form_name, form_description } = req.body;
        const foodId = (req.params.id);

        const result = await Food.updateOne(
            {
                _id: foodId,
                "formular._id": req.params.formId
            }
            ,
            {
                $set: {
                    "formular.$.form_name": form_name,
                    "formular.$.form_description": form_description,
                }
            }
        )
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:id', async (req, res) => {
    const foodId = (req.params.id);
    const query = { _id: foodId };
    const result = await Food.deleteOne(query);
    if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
    }
    res.sendStatus(204);
});

router.delete('/:id/:formId', async (req, res) => {
    try {
        const foodId = (req.params.id);
        const query = { _id: foodId };

        const result = await Food.updateOne(
            query,
            {
                $pull: {
                    formular: {
                        _id: req.params.formId
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