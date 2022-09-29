"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = void 0;
const dotenv = require('dotenv-override');
dotenv.config({ override: true });
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    signatureVersion: process.env.S3_SIGNATURE_VERSION,
});
const uploadImage = async (image) => {
    const buf = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const type = image.split(';')[0].split(':')[1];
    const key = Math.round(new Date().getTime() / 1000).toString() +
        '-' +
        Math.floor(Math.random() * 100000).toString() +
        '.' +
        type.split('/')[1];
    const data = {
        Key: key,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: `${type}`,
        Bucket: process.env.S3_BUCKET_NAME,
    };
    try {
        const { Location, key } = await s3.upload(data).promise();
        const result = {
            url: Location,
            key,
        };
        return result;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.uploadImage = uploadImage;
const deleteImage = async (key) => {
    const data = {
        Key: key,
        Bucket: process.env.S3_BUCKET_NAME,
    };
    try {
        return await s3.deleteObject(data).promise();
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.deleteImage = deleteImage;
