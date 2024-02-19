const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Author } = require("../models/Author");
module.exports = router;

// My Authors
const authors = [
  {
    id:1,
    firstName: "Nagiub",
    lastName: "Mahfouz",
    nationality: "Egyptian",
    image: "default-image.png",
  },
  {
    id:2,
    firstName: "Ahmed",
    lastName: "El Sayed",
    nationality: "Egyptian",
    image: "default-image.png",
  },
  {
    id:3,
    firstName: "Tafeeq",
    lastName: "Mahrous",
    nationality: "Egyptian",
    image: "default-image.png",
  },
];

// GET Authors
{
  /**
   * @desc   Get authors
   * @route  /api/authors
   * @method GET
   * @access public
   */
}

router.get("/", (req, res) => {
  res.status(200).json(authors);
});

// GET Author details
{
  /**
   * @desc   Get author Details
   * @route  /api/authors/:id
   * @method GET
   * @access public
   */
}

router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

// Create Author
{
  /**
   * @desc   Create authors
   * @route  /api/authors
   * @method POST
   * @access public
   */
}

// Validate Create Author
function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(20).required(),
    lastName: Joi.string().trim().min(3).max(20).required(),
    nationality: Joi.string().trim().min(3).max(20).required(),
    image: Joi.string(),
  });
  return schema.validate(obj);
}

router.post("/", async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
try {
    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
    });

    const result = await author.save();

    res.status(201).json(result);
    
}catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
}
});

//   Update Author

{
  /**
   * @desc Update Author
   * @route /api/authors/:id
   * @method PUT
   * @access public
   */
}

// Validate Update Author

function ValidateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(20),
    lastName: Joi.string().trim().min(3).max(20),
    nationality: Joi.string().trim().min(3).max(20),
    image: Joi.string(),
  });
  return schema.validate(obj);
}

router.put("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (author) {
    const { error } = ValidateUpdateAuthor(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      res.status(200).json({
        message: "author has been updated",
      });
    }
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

{
  /**
   * @desc   delete author
   * @route  /api/author/:id
   * @method delete
   * @access public
   */
}

router.delete("/:id", (req, res) => {
  const author = authors.find((b) => b.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json({ message: "author has been deleted" });
  } else {
    res.status(404).json({ message: "author not found" });
  }
});
