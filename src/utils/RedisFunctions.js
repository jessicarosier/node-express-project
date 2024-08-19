const logger = require('../utils/logger');
const Redis = require('ioredis');
const _RedisClient = require('../config/Redis_Functions');

class _Redis {
    constructor() {
        this.client = new Redis();
    }

    /* Fuction that makes a connection to the Redis DB and returns the client */
    async connect() {
        await _RedisClient.connect()
        return this.client;
    }

    async disconnect() {
        await _RedisClient.disconnect();
        return this.client;
    }


    /* Hash functions */
    async hset(key, field, value) {
        await this.connect();
        this.client.hset(key, field, value);
        await this.disconnect();
        return this.client

    }

    async hget(key, field) {
        return this.client.hget(key, field);
    }

}

async function test() {
    const redis = new _Redis();
    await redis.hset('user', 'name', 'John Doe');
    const name = await redis.hget('user', 'name');
    logger.info(name);
}

test();
