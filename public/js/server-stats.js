let tools = require("wire-webapp-tools");

let serverStats = {
  getServerStats: async () => {
    let stats = await tools.getStats();
    tools.console.log("Server Stats", stats);
    console.log(stats);
    return stats;
  },
};

module.exports = serverStats;
