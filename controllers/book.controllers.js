const Book = require("../models/Book.model");
const mongoose = require("mongoose");


async function getBooks(req, res) {
  try {
    const book = await Book.find({});
    res.status(200).json({status:"SUCCESS", book});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status:"FAILED", message: "Internal Server Error" });
  }
}


async function getBookById(req,res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({ status:"FAILED", message: "Book not found" });
    }

    const book = await Book.findOne({ _id: req.params.id });
    // console.log(book);
    if (!book) return res.status(404).json({ status:"FAILED", message: "Book not found" });
    res.status(200).json({status:"SUCCESS", book});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status:"FAILED", message: "Internal Server Error" });
  }
}

async function createBook(req, res) {
  try {
    const { title, author, genre, price, inStock } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      price,
      inStock
    });

    const savedBook = await newBook.save();
    res.status(201).json({status:"SUCCESS", book:savedBook});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status:"FAILED", message: "Internal Server Error" });
  }
}

async function updateBook(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({ status:"FAILED", message: "Book not found" });
    }

    const book = await Book.findOne({ _id: req.params.id });
    // console.log(book);
    if (!book) return res.status(404).json({ status:"FAILED", message: "Book not found" });

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({status:"SUCCESS", book:updatedBook});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status:"FAILED", message: "Internal Server Error" });
  }
}

async function deleteBook(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({ status:"FAILED", message: "Book not found" });
    }

    const book = await Book.findOne({ _id: req.params.id });
    // console.log(book);
    if (!book) return res.status(404).json({ status:"FAILED", message: "Book not found" });

    const deletedBook = await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ status:"SUCCESS", message: "Book deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
