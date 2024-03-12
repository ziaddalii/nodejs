const express = require("express");
const router = express.Router();
const {
  validateCreateBook,
  validateUpdateBook,
  Book,
} = require("../models/Book");
const asyncHandler = require("express-async-handler");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")
// GET Books
{
  /**
   * @desc   Get all books
   * @route  /api/books
   * @method GET
   * @access public
   */
}
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
    res.status(200).json(books);
  })
);

// GET Book Details
{
  /**
   * @desc   Get book by ID
   * @route  /api/books/:id
   * @method GET
   * @access public
   */
}
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  })
);

// POST Add Book

{
  /**
   * @desc   Create book
   * @route  /api/books
   * @method POST
   * @access private (only admin)
   */
}
router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      desc: req.body.desc,
      cover: req.body.cover,
      price: req.body.price,
    });

    const result = await book.save();
    res.status(201).json(result);
  })
);

module.exports = router;

{
  /**
   * @desc   Update book
   * @route  /api/books/:id
   * @method PUT
   * @access private (only admin)
   */
}

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          desc: req.body.desc,
          cover: req.body.cover,
          price: req.body.price,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedBook);
  })
);

{
  /**
   * @desc   delete book
   * @route  /api/books/:id
   * @method delete
   * @access private (only admin)
   */
}

router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.status(200).json({ message: "book has been deleted" });
    } else {
      res.status(404).json({ message: "book not found" });
    }
  })
);
