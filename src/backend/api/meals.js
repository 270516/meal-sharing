const express = require("express");
const router = express.Router();
const knex = require("../database");

// Add the query parameters to the existing GET /api/meals route
router.get("/", async (req, res) => {
    const {
      maxPrice,
      availableReservations,
      title,
      dateAfter,
      dateBefore,
      limit,
      sortKey,
      sortDir,
    } = req.query;
  
    let query = knex("meals");
  
    if (maxPrice) query = query.where("price", "<", maxPrice);
    if (availableReservations !== undefined)
      query = availableReservations
        ? query.where("max_reservations", ">", knex.raw("reservations"))
        : query.where("max_reservations", "<=", knex.raw("reservations"));
    if (title) query = query.where("title", "ilike", `%${title}%`);
    if (dateAfter) query = query.where("when", ">", dateAfter);
    if (dateBefore) query = query.where("when", "<", dateBefore);
  
    // Sorting
    if (sortKey && sortDir) {
      query =
        sortDir === "asc"
          ? query.orderBy(sortKey, "asc")
          : query.orderBy(sortKey, "desc");
    } else {
      query = query.orderBy("id", "asc");
    }
  
    // Limiting results
    if (limit) {
      const limitedResults = await query.limit(limit);
      res.json(limitedResults);
    } else {
      const results = await query;
      res.json(results);
    }
  });
  
//GET - Returns all meals
router.get("/", async (request, response) => {
  try {
    const meals = await knex("meals").select("*");
    response.json(meals);
  } catch (error) {
    response.status(500).json({ error: "Error retrieving meals" });
  }
});

//POST - Add a new meal to the database
router.post("/", async (request, response) => {
  const newMeal = request.body;
  newMeal.created_date = new Date();
  try {
    await knex("meals").insert(newMeal);
    response.status(201).json("Meal created successfully");
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Error creating meal" });
  }
});

//GET Return a meal by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const meal = await knex("meals").select("*").where({ id }).first();
    if (meal) {
      response.json(meal);
    } else {
      response.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Error retrieving meal" });
  }
});

//PUT - Update a meal by id
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updateMeal = request.body;

    const results = await knex("meals")
      .update(updateMeal)
      .where({ id });

    if (results) {
      return response.json({message: "Meal updated successfully"});
    } else {
      return response.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error updating meal"});
  }
});

//DELETE - Delete a meal by id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteMeal = await knex("meals").select("*").where({ id }).del();
    if (deleteMeal) {
      response.json({message: "Meal deleted successfully"});
    } else {
      response.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Error deleting meal"});
  }
});

module.exports = router;