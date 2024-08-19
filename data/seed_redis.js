const Redis = require('ioredis');
const { v4: uuidv4 } = require('uuid');

// Create a new Redis instance
const redis = new Redis();

// Function to generate a random file size between min and max bytes
function getRandomFileSize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random file name with a given extension
function getRandomFileName(extension) {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `file_${randomNumber}.${extension}`;
}

// Seed Redis with 50 complex hashes representing files
async function seedRedis() {
    for (let i = 0; i < 50; i++) {
        const fileExtension = ['txt', 'pdf', 'docx'][Math.floor(Math.random() * 3)];
        const fileName = getRandomFileName(fileExtension);
        const fileSize = getRandomFileSize(1000, 10000); // Random size between 1000 and 10000 bytes
        const createdAt = Date.now(); // Current timestamp in milliseconds
        const fileUUID = uuidv4(); // Generate a UUID for the file

        // Construct the hash key using the UUID
        const hashKey = `file:${fileUUID}`;

        // Use HMSET to insert the file data into Redis
        await redis.hmset(hashKey, {
            filename: fileName,
            size: fileSize,
            created_at: createdAt,
            uuid: fileUUID
        });

        console.log(`Inserted file ${i+1}: ${fileName}`);
    }

    console.log('Seeding completed.');
    redis.quit(); // Properly close the connection
}

seedRedis().catch(console.error);
