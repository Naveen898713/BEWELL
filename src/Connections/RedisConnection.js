const { createClient } = require("redis");
const client = createClient();
client.on("error", (err) => {
  console.log("Redis Client Error", err);
});
client.connect().then(() => {
  console.log("redis Conneted Successfully");
});

exports.redis = client;

const storeOtp = async (storeKey, otp) => {
  try {
    const key = `otp:${storeKey}`;
    await client.set(key, otp);
    const expirationTimeInSeconds = 300; // 3 minutes
    await client.expire(key, expirationTimeInSeconds);
    console.log("store Otp", storeKey);
  } catch (error) {
    console.log("Fail to store otp:" + error);
  }
};
const retrieveOtp = async (storeKey) => {
  try {
    const key = `otp:${storeKey}`;
    const value = await client.get(key);
    return value;
  } catch (error) {
    console.log("Fail to retrieve otp:" + error);
  }
};

const storedetails = async (storeKey, details) => {
  try {
    const key = `details:${storeKey}`;
    await client.set(key, JSON.stringify(details));
  } catch (error) {
    console.log("Fail to store details:" + error);
  }
};

const retrievedetails = async (storeKey) => {
  try {
    const key = `details:${storeKey}`;
    const value = await client.get(key);
    return JSON.parse(value);
  } catch (error) {
    console.log("Fail to retrieve details:" + error);
  }
};

module.exports = {
  client,
  storeOtp,
  retrieveOtp,
  storedetails,
  retrievedetails,
};
