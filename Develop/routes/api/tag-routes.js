const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const tagData = await Tag.findAll({
        include: 
        { model: Product, 
          through: ProductTag, 
          as: "product tag" },
    });
    if (!tagData) {
        res.status(404).json({
            message: "No tags found for this product!",
        });
        return;
    }
    res.status(200).json(tagData);
} catch (err) {
    res.status(500).json(err);
}
});
  // find all tags
  // be sure to include its associated Product data


router.get('/:id', (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: 
      [{ model: Product, 
        through: ProductTag, 
        as: 'product tag' }],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tags found for this product!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find a single tag by its `id`
  // be sure to include its associated Product data


router.post('/', (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
  // create a new tag

router.put('/:id', (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
        tag_name: req.body.tag_name,
        where: {
            id: req.params.id,
        },
    });
    if (!tagData) {
        res.status(404).json({
            message: "No tags found for this product!",
        });
        return;
    }
    res.json(tagData)
} catch (err) {
  res.json(err)
}
});
  // update a tag's name by its `id` value

router.delete('/:id', (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tags found for this product!' });
    };
    res.status(200).json({message: `Tag ID is deleted.`})
  } catch (err) {
    res.status(500).json(err);
  }
});
  // delete on tag by its `id` value

module.exports = router;
