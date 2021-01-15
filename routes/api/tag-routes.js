const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: ["product_name"],
    },
  })
    .then((status) => {
      res.json(status);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "not connected " });
    });
});
router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
    },
  })
    .then((displayId) => {
      res.json(displayId);
    })
    .catch((error) => {
      if (!error) {
        res.status(404).json({ message: "item is not found" });
      }
      console.log(error);
      res.status(500).json({ message: "not connected " });
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body, {
    tag_name: req.params.tag_name,
  }).then((createTag) => {
    res.json(createTag);
  }) .catch((error) => {
    
    console.log(error);
    res.status(500).json({ message: "cannot create a tag because server not connected " });
  });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.params.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((status) => {
      res.json(status);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "cannot update an item thats not on the table" });
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((findId) => {
      if(!findId){
        res.json(404).json({message:"id not found!"})
      }
      res.json(status);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "cannot delete an item not found " });
    });
});
module.exports = router;
