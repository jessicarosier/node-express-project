let express = require("express");
let router = express.Router();

let StatsLogic = require("../logic/stats-logic");


/* GET stats page. */

router.get("/api/v1/stats/:startDate/:endDate", async (req, res, next) => {
    let statsLogic = new StatsLogic();
    try {
        const data = await statsLogic.getTotalUsageStats(req, res); // Fetch data
        console.log(data);
        res.json(data); // Send data as JSON response
    } catch (error) {
        next(error); // Forward errors to Express error handling
    }
});



module.exports = router;