import nodemailer from "nodemailer";

type OrderItemEmail = {
  title: string;
  quantity: number;
  price: number;
};

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOrderPaidEmail(params: {
  to: string;
  orderId: string;
  items: OrderItemEmail[];
  total: number;
}) {
  const itemsHtml = params.items
    .map(
      (item) =>
        `<li>${item.title} × ${item.quantity} — $${(
          item.price / 100
        ).toFixed(2)}</li>`
    )
    .join("");

  await transporter.sendMail({
    from: `"TeaStorm" <${process.env.EMAIL_FROM}>`,
    to: params.to,
    subject: `Your TeaStorm order ${params.orderId.slice(0, 8)}`,
    html: `
      <h2>Thank you for your order</h2>
      <p>Order #${params.orderId}</p>
      <ul>${itemsHtml}</ul>
      <p><strong>Total:</strong> $${(params.total / 100).toFixed(2)}</p>
    `,
  });
}

export async function sendAdminOrderPaidEmail(params: {
  orderId: string;
  email: string | null;
  items: OrderItemEmail[];
  total: number;
}) {
  const itemsHtml = params.items
    .map(
      (item) =>
        `<li>${item.title} × ${item.quantity} — $${(
          item.price / 100
        ).toFixed(2)}</li>`
    )
    .join("");

  await transporter.sendMail({
    from: `"TeaStorm" <${process.env.EMAIL_FROM}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New paid order ${params.orderId.slice(0, 8)}`,
    html: `
      <h2>New paid order</h2>
      <p><strong>Order:</strong> ${params.orderId}</p>
      <p><strong>Customer email:</strong> ${params.email ?? "—"}</p>
      <ul>${itemsHtml}</ul>
      <p><strong>Total:</strong> $${(params.total / 100).toFixed(2)}</p>
    `,
  });
}
