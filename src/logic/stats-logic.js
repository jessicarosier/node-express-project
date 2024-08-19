let RedisFunctions = require("../config/Redis_Functions");

class StatsLogic {
    constructor() {
        this._redis = new RedisFunctions();
    }

    async getTotalUsageStats(req, res) {
        const result = [];

        console.log("Fetching stats");

        try {
            let startDate = new Date(req.params.startDate);
            let endDate = new Date(req.params.endDate);

            while (startDate <= endDate) {
                let dateString = startDate.toISOString().split("T")[0];
                // Use getHashAll correctly
                let data = await this._redis.getHashAll("totalUsage", dateString);

                if (data) {
                    result.push(data);
                }
                startDate.setDate(startDate.getDate() + 1);
            }

            console.log(result);
            res.json({result});
        } catch (err) {
            console.error("Error fetching total usage stats:", err);
            throw err;
        }
    }
}

module.exports = StatsLogic;
