const dotenv = require('dotenv-override');
dotenv.config({ override: true });

const AWS = require('aws-sdk');

export type Image = {
  url: string;
  key: string;
};

const s3 = new AWS.S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  signatureVersion: process.env.S3_SIGNATURE_VERSION,
});

export const uploadImage = async (image: string): Promise<Image> => {
  const buf = Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );

  const type = image.split(';')[0].split(':')[1];

  const key =
    Math.round(new Date().getTime() / 1000).toString() +
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
    const result: Image = {
      url: Location,
      key,
    };
    return result;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const deleteImage = async (key: string) => {
  const data = {
    Key: key,
    Bucket: process.env.S3_BUCKET_NAME,
  };
  try {
    return await s3.deleteObject(data).promise();
  } catch (error) {
    console.log(error);
    return error;
  }
};
