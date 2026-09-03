export interface DemoEmailPayload {
  to: string;
  contact_name: string;
  fishery_name: string;
  demo_link: string;
}

export async function sendDemoLinkEmail(payload: DemoEmailPayload): Promise<{ success: boolean; message: string }> {
  // TODO: Connect to your email provider of choice:
  // - Resend:     Use Resend SDK with resend.emails.send()
  // - SendGrid:   Use @sendgrid/mail with sgMail.send()
  // - Gmail SMTP: Use nodemailer with Gmail SMTP config
  // - Supabase:   Deploy an Edge Function that calls your email provider
  // - n8n:        POST to your n8n webhook URL

  const subject = "Your FisheryHub demo link";
  const body = `
Hi ${payload.contact_name},

Thanks for requesting a FisheryHub demo.

You can view the demo here:

${payload.demo_link}

Inside the demo you can preview:

* public lake listing
* swim map and booking flow
* owner dashboard
* booking calendar
* bailiff dashboard
* catch reports
* local services and weather widgets

This demo uses sample data only.

If you would like help setting up your fishery, reply to this email and we can talk through your lake, swims, prices, and booking setup.

Thanks,
FisheryHub.uk
`.trim();

  console.log("[Demo Email Placeholder]", { to: payload.to, subject, bodyLength: body.length });

  // PLACEHOLDER: Simulate email sending
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Email placeholder — connect provider to send real emails." });
    }, 1000);
  });
}

export function generateDemoLink(token: string): string {
  const basePath = (typeof window !== "undefined" && (window as any).__BASE_PATH__) || "";
  const path = basePath ? `/${basePath}` : "";
  return `${window.location.origin}${path}/demo/access/${token}`;
}

export function generateDemoToken(): string {
  // TODO: Replace with crypto.randomUUID() or a server-generated token
  return `demo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}