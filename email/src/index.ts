import { EachMessagePayload } from "kafkajs";
import { consumerRun } from "./events";




const run = async () => {
  consumerRun(async ({ message }: EachMessagePayload): Promise<void> => {
    console.log(`Message: ${message.key} = ${message?.value?.toString()}`);
  });
};

run();
