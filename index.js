const express = require("express");
const hbs = require("hbs");
const path = require("path");
const WeatherData = require("./routes/index"); 

const app = express();
const PORT = process.env.PORT || 5001;

const publicpath = path.join(__dirname, "public");
const viewPath = path.join(__dirname, "templates/views");
const partialsPath= path.join(__dirname, "templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicpath));

app.get("/", (req, res) => {
    res.render("index", {title: "Weather App"});
});

app.get("/weather", (req, res) => {
    const address = req.query.address; 

    if (!address) {
        return res.status(400).send({ error: "Address is required" });
    }

    WeatherData(address, (error, result) => {
        if (error) {
            return res.status(500).send({ error });
        }
        res.send(result);
    });
});

app.get("*", (req, res) => {
    res.render("404", {title: "page not found"});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
