const express = require("express");
const router = express.Router();
const knex = require("../database");


// GET return all reservations

router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservation").select("*");
    response.json(reservations);
  } catch (error) {
    response.status(500).json({ error: "Error retrieving reservations" });
    }
  });


// POST Adds a new reservation to the database ??

router.post("/", async (request, response) => {
    const newReservation = request.body;
    newReservation.created_date = new Date();
    try {

      await knex("Reservation").insert(newReservation);
      response.status(201).json("Reservation created successfully")
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Error creating reservation" });
    }

  });

  //GET Returns a reservation by id

  router.get("/:id", async (request, response) => {

    try {
      const { id } = request.params;
      const reservations = await knex("Reservation").select("*").where({ id }).first();
      if (reservations) {
        response.json(reservations);
      } else {
        response.status(404).json({ error: "Reservation not found" });
      }
    } catch (error) {
      response.status(500).json({ error: "Error retrieving reservation" });
    }
  });

  //PUT - Update a reservation by id 

  router.put("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const updateReservation = request.body;

      const results = await knex("Reservation")
        .update(updateReservation)
        .where({ id })

      if (results) {
        return response.json({message: "Reservation updated successfully"});
      } else {
        return response.status(404).json({ error: "Reservation not found" });
      }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ error: "Error updating reservation"});
    }
  })

  //DELETE - Delete a reservation by id

  router.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const deleteReservation = await knex("Reservation").select("*").where({ id }).del();
      if (deleteReservation) {
        response.json({message: "Reservation deleted successfully"});
      } else {
        response.status(404).json({ error: "Reservation not found" });
      }
    } catch (error) {
      console.log(error)
      response.status(500).json({ error: "Error deleting reservation"});
    }
  })

  module.exports = router;