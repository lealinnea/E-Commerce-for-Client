const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
        include: { model: Product },
    });

    if (!categoryData) {
        res.status(404).json({
            message: "No category found with this ID!",
        });
        return;
    }
    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
});
  // find all categories
  // be sure to include its associated Products

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
        res.status(404).json({
            message: "No category found with this ID!",
        });
        return;
    }
    res.json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
});
  // find one category by its `id` value
  // be sure to include its associated Products

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
} catch (err) {
    res.status(400).json(err);
}
});

  // create a new category


router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that ID!'});
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
  // update a category by its `id` value

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
        where: {
            id: req.params.id,
        },
    });
    if (!categoryData) {
        res.status(404).json({message: "No category found with this ID!"});
        return;
    }
    res.status(200).json({message: `Category ID is deleted.`})
  } catch (err) {
    res.status(500).json(err);
  }
});
  // delete a category by its `id` value

module.exports = router;
