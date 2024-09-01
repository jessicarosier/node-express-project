let express = require("express");
let pythonRouter = express.Router();

let HelperFunctions = require("../utils/HelperFunctions");




pythonRouter.post("/api/v1/pdf", async (req, res, next) => {
    let script = "src/python/create-pdf.py";
    console.log(req.body);
    console.log(req.body.title);
    try {
        const data = await HelperFunctions.executePythonScript(script, [req.body.title, req.body.content]) // Fetch data
        console.log(data);
        res.json(data); // Send data as JSON response
    } catch (error) {
        next(error); // Forward errors to Express error handling
    }
});



module.exports = pythonRouter;