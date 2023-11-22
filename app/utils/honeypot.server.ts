import { Honeypot, SpamError } from "remix-utils/honeypot/server";

// Create a new Honeypot instance, the values here are the defaults, you can
// customize them
export const honeypot = new Honeypot({
  randomizeNameFieldName: false,
  nameFieldName: "name__confirm",
  validFromFieldName: "from__confirm", // null to disable it
  encryptionSeed: process.env.HONEYPOT_SECRET, // Ideally it should be unique even between processes
});

export const checkHoneypot = (formData: FormData) => {
  try {
    // honeypot to verify our form isn't being spammed
    honeypot.check(formData);
  } catch (error) {
    if (error instanceof SpamError) {
      throw new Response("Invalid form", { status: 400 });
    }
    throw error;
  }
};
