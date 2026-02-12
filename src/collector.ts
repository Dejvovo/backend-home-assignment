import { client } from "./mqtt/client";

type ICarState = {
  id?: 1;
  location: {
    latitude?: number;
    longitude?: number;
  };
  speed?: number; // m/s
  gear?: number; // {1, 2, 3, 4, 5, 6}
  battery?: {
    soc?: number;
    capacity?: number;
  }[]; // Indexes are low, capacity between 0-100
};

type IMessage = {
  value: number;
};

let car: ICarState = { location: {}, battery: [] }; // TODO: Switch to Redis state for better durability and scalability

const getBatteryIdx = (topic: string) => Number(topic.split("/")[3]);

client.on("message", (topic: string, payload: Buffer) => {
  const messageString = payload.toString();
  const message = JSON.parse(messageString) as IMessage; // TODO better parser error handling

  if (topic.endsWith("/latitude")) {
    car.location.latitude = message.value;
    return;
  }

  if (topic.endsWith("/longitude")) {
    car.location.longitude = message.value;
    return;
  }

  if (topic.endsWith("/soc")) {
    const batteryIdx = getBatteryIdx(topic);
    if (!car.battery[batteryIdx]) car.battery[batteryIdx] = {};
    car.battery[batteryIdx].soc = message.value;
    return;
  }

  if (topic.endsWith("/capacity")) {
    const batteryIdx = getBatteryIdx(topic);
    if (!car.battery[batteryIdx]) car.battery[batteryIdx] = {};
    car.battery[batteryIdx].capacity = message.value;
    return;
  }

  if (topic.endsWith("/speed")) {
    car.speed = message.value;
    return;
  }

  if (topic.endsWith("/gear")) {
    car.gear = message.value;
    return;
  }

  console.error(`Unknown topic: ${topic}`);
});

const outputCar = () => console.log(JSON.stringify(car));
const planCarOutput = () => {
  setTimeout(() => {
    outputCar();
    planCarOutput();
  }, 1000);
};

planCarOutput();
