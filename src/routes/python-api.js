let express = require("express");
let pythonRouter = express.Router();
let path = require("path");
let fs = require("fs");

let HelperFunctions = require("../utils/HelperFunctions");




pythonRouter.post("/api/v1/pdf", async (req, res, next) => {
    let script = "src/python/create-pdf.py";
    console.log(req.body);

    try {
        const data = await HelperFunctions.executePythonScript(script, [req.body.title, req.body.content]) // Fetch data
        res.json({ result: data }); // Send data to client
    }
        catch (error) {
        next(error); // Forward errors to Express error handling
    }
});

pythonRouter.get("/api/v1/download/:filePath(*)", async (req, res, next) => {
    console.log("Download file");
    try {
        // Decode the URL-encoded file path
        let filePath = decodeURIComponent(req.params.filePath);
        console.log("Requested file path:", filePath);


        // Check if file exists
        if(!fs.existsSync(filePath)) {
            return res.status(404).send("File not found");
        }

        // Initiate file download
        res.download(filePath, (error) => {
            if (error) {
                next(error);
            } else {
                console.log("File downloaded successfully");
            }
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).json({error:"File not found"});
        } else {
            next(error);
        }
    }
});




module.exports = pythonRouter;