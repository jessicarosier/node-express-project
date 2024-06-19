/*
This file is used to configure the Redis DB connection.
 */
const logger = require('../utils/logger');
const { createClient } = require('redis');

class RedisClient {

    // Create a new RedisClient singleton
    static client = createClient();

    // Connect to the Redis DB
    static async connect() {
        try {
            await this.client.connect();
            logger.info('Connected to Redis');
        } catch (error) {
            logger.error(`Error connecting to Redis: ${error}`);
        }
    }

    // Disconnect from the Redis DB
    static async disconnect() {
        try {
            await this.client.disconnect();
            logger.info('Disconnected from Redis');
        } catch (error) {
            logger.error(`Error disconnecting from Redis: ${error}`);
        }
    }
}

module.exports = RedisClient;

