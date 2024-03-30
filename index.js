
const generateGameBoard = require('./generateGameBoard');
const dotenv = require('dotenv');
dotenv.config();

const buffer = generateGameBoard();
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
})

const s3 = new AWS.S3();
const params = {
    Bucket: 'tic-actions',
    Key: 'game-board.png',
    Body: buffer,
    ContentType: 'image/png',
};

s3.upload(params, (err, data) => {
    if(err){
        console.error("Error uploading image: ", err);
        process.exit(1);
    } else {
        const imageUrl = data.Location;
        console.log("Image uploaded successfully: ", imageUrl);
        process.env.IMAGE_URL = imageUrl;
        process.exit(0);
    }
})