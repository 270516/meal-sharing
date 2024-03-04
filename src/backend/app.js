const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);

router.use("/all-meals", mealsRouter)

router.get("/future-meals", async (request, response) => {
  try {
    const futureMeals = await knex("meal").where("when", ">", new Date());
    response.json(futureMeals);
  } catch (error) {
    response.status(500).json({error: "No meals found"});
  }
});

router.get("/past-meals", async(req, res) => {
  try {
    const pastMeals = await knex("meal").where("when", "<" , new Date());
    res.json(pastMeals);
  } catch (error) {
    res.status(500).json({error: "No meals found"});
  }
});

router.get("/all-meals", async(req, res) => {
  try {
    const allMeals = await knex.raw("SELECT * FROM meal ORDER BY id");
    res.json(allMeals.rows);
  } catch (error) {
    res.status(500).json({error: "No meals found"});
  }
});

router.get("/first-meal", async(req, res) => {
  try {
    const firstMeal = await knex("meal").orderBy("id").first();
    if (!firstMeal) {
    return res.status(404).json({error: "No meals found"});
  }
  res.json(firstMeal)
} catch (error) {
  res.status(500).json({error: "No meals found"});
}
});

router.get("/last-meal", async(req, res) => {
  try {
    const lastMeal =await knex("meal").orderBy("id", "desc").first();
    if (!lastMeal) {
      return res.status(404).json({error: "No Meal found"});
    }
    res.json(lastMeal)
  } catch ( error) {
    res.status(500).json({error: "No meals found"})
  }
});


if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
