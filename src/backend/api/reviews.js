const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all reviews
router.get("/", async (req, res) => {
  const reviews = await knex("review").select("*");
  res.json(reviews);
});

// GET reviews for a specific meal
router.get("/meals/:meal_id/reviews", async (req, res) => {
  const { meal_id } = req.params;
  const reviews = await knex("review")
    .select("*")
    .where("meal_id", meal_id);
  res.json(reviews);
});

// POST a new review
router.post("/", async (req, res) => {
  const newReview = req.body;
  const insertedReview = await knex("review").insert(newReview);
  res.status(201).json(insertedReview[0]);
});

// GET a review by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const review = await knex("review").select("*").where({ id }).first();
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ error: "Review not found" });
  }
});

// PUT update a review by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedReview = req.body;
  const results = await knex("review").update(updatedReview).where({ id });

  if (results) {
    res.json({ message: "Review updated successfully" });
  } else {
    res.status(404).json({ error: "Review not found" });
  }
});

// DELETE a review by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedRows = await knex("review").where({ id }).del();
  if (deletedRows) {
    res.json({ message: "Review deleted successfully" });
  }
});

