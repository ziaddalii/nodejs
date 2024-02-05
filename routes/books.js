const express = require("express");
const router = express.Router();
const Joi = require("joi");

// My Books
const books = [
  {
    id: 1,
    title: "Harry Potter",
    author: "Ahmed El-Sayed Tawfiq",
    desc: "a Sci-fi book",
    price: 125,
  },
  {
    id: 2,
    title: "Harry Potter : Chamber of Philosophy",
    author: "Ahmed El-Sayed Tawfiq",
    desc: "a Sci-fi book",
    price: 215,
  },
];

// HTTP METHODS

router.get("/", (req, res) => {
  res.send("Hello Welcome to expressssssssssss js ");
});

// GET Books
{
  /**
   * @desc   Get all books
   * @route  /api/books
   * @method GET
   * @access public
   */
}
router.get("/", (req, res) => {
  res.json(books);
});

// GET Book Details
{
  /**
   * @desc   Get book by ID
   * @route  /api/books/:id
   * @method GET
   * @access public
   */
}
router.get("/:id", (req, res) => {
  const book = books.find((e) => e.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else res.status(404).json({ message: "book not found" });
});

// POST Add Book

{
    /**
     * @desc   Create book
     * @route  /api/books
     * @method POST
     * @access public
     */
  }
router.post("/", (req, res) => {
    const {error} = validateCreateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  console.log(req.body);
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    desc: req.body.desc,
    price: req.body.cover,
  };

  books.push(book);
  res.status(201).json(book); // 201 => created successfully
});

// Validate Create Book
function validateCreateBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().trim().min(3).max(40).required(),
        desc: Joi.string().trim().min(3).max(500).required(),
        price: Joi.number().min(0).required(),
      });
      return schema.validate(obj);
}
module.exports = router;
