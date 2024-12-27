import { RedisClientType, createClient } from "redis";

class Redis {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: `redis://default:secret00@localhost:6379`,
    });

    this.client.connect();

    this.client.on("connect", async () => {
      console.log("✅ Successfully connected with redis");
    });
  }

  public async redisNotifyEvent(): Promise<void> {
    try {
      const client = this.client.duplicate();

      await client.connect();

      client.PSUBSCRIBE("__keyevent@0__:expired", async (message: string, channel: string) => {
        if (message.startsWith("PRODUCT-")) {
          console.log(`Message: ${message}`);
          console.log(`Channel: ${channel}`);
          console.log("========================================================");
          console.log(`EXECUTE PAYLOAD WITH KEY: ${message}`);
          console.log("========================================================");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Redis();
