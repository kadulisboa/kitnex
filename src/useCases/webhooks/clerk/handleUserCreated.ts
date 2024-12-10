import { createUser } from "@/useCases/users/createUser";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function handleUserCreated(data: WebhookEvent["data"]) {
  try {
    if ("email_addresses" in data) {
      await createUser({
        clerkId: data.id as string,
        name: `${data.first_name} ${data.last_name}`.trim(),
        email: data.email_addresses[0].email_address,
        planId: "",
      });

      return { success: true };
    } else {
      throw new Error("Invalid data: email_addresses not found");
    }
  } catch (error) {
    console.error("Error in user.created webhook:", error);
    throw error;
  }
}
