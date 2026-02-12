import mqtt from "mqtt";

// TODO to .env
const MQTT_URL = "mqtt://localhost:51883";

export const client = mqtt.connect(MQTT_URL);

client.on("connect", () => {
  console.log(`Connected to: ${MQTT_URL} `);

  client.subscribe("car/#", (err) => {
    // TODO more robbust error handling?
    if (err) {
      console.error("Subscription error:", err);
      return;
    }

    console.log("Subscribed to car/#");
  });
});

client.on("error", (err) => {
  console.error("Error:", err);
});

client.on("close", () => {
  console.log("Connection closed");
});
