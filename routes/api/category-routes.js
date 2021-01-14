const router = require("express").Router();
const { Category, Product } = require("../../models");
const { findAll } = require("../../models/Tag");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ["product_name"],
    },
  })
    .then((catProduct) => res.json(catProduct))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["category_id"],
    },
  })
    .then((findId) => res.json(findId))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateId) => {
      if (!updateId) {
        res.status(404).json({ message: "No category with this id" });
        return;
      }
      res.json(updateId);
    })
    .catch((error) => {
      console.log(err);
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteId) => {
      if (!deleteId) {
        res.status(404).json({ message: "No category found with this id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
