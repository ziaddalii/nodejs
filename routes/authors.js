const express = require("express");
const router = express.Router();
const Joi = require("joi");
module.exports = router;

// My Authors
const authors = [
  {
    id: 1,
    name: "Ahmed Tawfiq",
    age: 55,
  },
  {
    id: 2,
    name: "Naguib Mahfouz",
    age: 46,
  },
  {
    id: 3,
    name: "Ibrahim Amasha",
    age: 64,
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
    name: Joi.string().trim().min(3).max(20).required(),
    age: Joi.number().min(1).max(120).required(),
  });
  return schema.validate(obj);
}

router.post("/", (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    const author = {
      id: authors.length + 1,
      name: req.body.name,
      age: req.body.age,
    };
    authors.push(author);
    res.status(201).json(author); // 201 => created successfully
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
    name: Joi.string().trim().min(3).max(20),
    age: Joi.number().min(1).max(120),
  });
  return schema.validate(obj);
}

router.put("/:id", (req, res)=>{
    const author = authors.find(a => a.id === parseInt(req.params.id))
    if(author){
        const {error} = ValidateUpdateAuthor(req.body);
        if(error){
            res.status(400).json({message:error.details[0].message});
        }else{
            res.status(200).json({
                message:"author has been updated",
            })
        }
    }else{
        res.status(404).json({message:"author not found"})
    }
})

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
