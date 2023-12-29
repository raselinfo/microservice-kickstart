import { config } from "dotenv";

import { EachMessagePayload, Kafka, logLevel } from "kafkajs";
config();

console.log("Kafka Brokers: ", process.env.KAFKA_BROKER);


const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID as string,
  brokers: [process.env.KAFKA_BROKER as string],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME as string,
    password: process.env.KAFKA_PASSWORD as string,
  },
  logLevel: logLevel.ERROR,
  connectionTimeout: 3000,
});

export const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID as string,
});



export const consumerRun = async (cb:CallableFunction) => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC as string,
    fromBeginning: true,
  });
  console.log("Consumer connected........");
  await consumer.run({
    // eachBatch,
    // eachBatchAutoResolve,
    eachMessage: async (payload: EachMessagePayload) => {
      cb(payload);
    },
  });
};