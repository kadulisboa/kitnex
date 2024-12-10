import { WebhookEvent } from "@clerk/nextjs/server";
import { handleUserCreated } from "./handleUserCreated";
export async function handleClerkWebhook(evt: WebhookEvent) {
  switch (evt.type) {
    case "user.created":
      return handleUserCreated(evt.data);
    default:
      console.log(`Webhook type ${evt.type} not handled`);
    // throw new Error(`Webhook type ${evt.type} not handled`);
  }
}
