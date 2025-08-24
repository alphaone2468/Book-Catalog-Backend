const express = require("express");
const Book = require("../models/Book.model"); 
const { authMiddleware } = require("../middleware/auth.middleware"); 
const { getBooks, getBookById,createBook,updateBook,deleteBook } = require("../controllers/book.controllers");
const router = express.Router();


router.get("/", async(req,res)=>getBooks(req,res));

router.get("/:id", async (req, res) => getBookById(req,res));

router.post("/", authMiddleware, async (req, res) => createBook(req, res));

router.put("/:id", authMiddleware, async (req, res) => updateBook(req, res));

router.delete("/:id", authMiddleware, async (req, res) => deleteBook(req, res));

module.exports = router;
