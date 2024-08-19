const { createClient } = require('redis');
const logger = require('../utils/logger');

class RedisFunctions {
    constructor() {
        this.client = createClient({
            host: 'localhost', // Redis server host
            port: 6379,        // Redis server port
        });

        this.client.on('error', (err) => logger.error('Redis Client Error', err));

        this.connect().then(r => r);
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("Connected to Redis");
        } catch (error) {
            console.error("Failed to connect to Redis:", error);
        }
    }

    async setKey(key, value) {
        await this.client.set(key, JSON.stringify(value));
    }

    async getKey(key) {
        const result = await this.client.get(key);
        return JSON.parse(result);
    }

    async setHash(hashKey, field, value) {
        await this.client.hset(hashKey, field, JSON.stringify(value));
    }

    async getHash(hashKey, field) {
        const result = await this.client.HGET(hashKey, field);
        return JSON.parse(result);
    }

    async getHashAll(table, key) {
        let query = `${table}:${key}`;
        console.log(query);
        const result = await this.client.HGETALL(query);
        let parsedResult = {};
        for (let field in result) {
            parsedResult[field] = JSON.parse(result[field]);
        }
        return parsedResult;
    }
}

module.exports = RedisFunctions;
