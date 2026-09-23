import { supabase } from "./supabase";

export interface DemoRequestInput {
  fisheryName: string;
  contactName: string;
  email: string;
  phone?: string;
  postcode?: string;
  numberOfLakes?: string;
  numberOfSwims?: string;
  currentBookingMethod?: string;
  interests: string[];
  message?: string;
  consentToContact: boolean;
  sourcePage: string;
}

export async function createDemoRequest(
  input: DemoRequestInput,
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { error } = await supabase.from("demo_requests").insert({
      fishery_name: input.fisheryName,
      contact_name: input.contactName,
      email: input.email,
      phone: input.phone || null,
      postcode: input.postcode || null,
      number_of_lakes: input.numberOfLakes ? parseInt(input.numberOfLakes, 10) : null,
      number_of_swims: input.numberOfSwims ? parseInt(input.numberOfSwims, 10) : null,
      current_booking_method: input.currentBookingMethod || null,
      interests_json: input.interests,
      message: input.message || null,
      consent_to_contact: input.consentToContact,
      status: "new",
      source_page: input.sourcePage,
    });

    if (error) {
      return { success: false, error: "We couldn't save your request. Please try again." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "We couldn't save your request. Please try again." };
  }
}