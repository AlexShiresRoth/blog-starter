"use server";
import sgMail from "@sendgrid/mail";

export async function submitForm(data: FormData) {
  const formData = {
    name: data.get("name") ?? "",
    email: data.get("email") ?? "",
    message: data.get("Message") ?? "",
    category: data.get("Category") ?? "",
    gradeLlevel: data.get("Student grade level") ?? "",
    phone: data.get("phone") ?? "",
  };

  if (
    formData.name === null ||
    formData.email === null ||
    formData.category === null ||
    formData.gradeLlevel === null ||
    formData.phone === null
  ) {
    console.error("Missing form data");
    throw new Error("Missing required fields");
  }

  if (process.env.SENDGRID_API_KEY === undefined) {
    console.error("SENDGRID_API_KEY is not defined");
    throw new Error("SENDGRID_API_KEY is not defined");
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

  const msg = {
    to: "satactsense@gmail.com", // Change to your recipient
    from: "alexroth96@gmail.com", // Change to your verified sender
    subject: `SATACTSENSE.com: ${formData.category}`,
    text: JSON.stringify(formData.message),
    html: `<strong>New Website Lead</strong><br />
    <strong>Name:</strong> ${formData.name}<br />
    <strong>Email:</strong> ${formData.email}<br />
    <strong>Phone:</strong> ${formData.phone}<br />
    <strong>Category:</strong> ${formData.category}<br />
    <strong>Grade Level:</strong> ${formData.gradeLlevel}<br />
    <strong>Message:</strong> ${formData.message}<br />
    `,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log("Email sent", response);
    })
    .catch((error) => {
      console.error(error);
    });
}
