/**
 * Telegram Concierge Notification Service
 */

export async function sendTelegramOrder(cart, customerInfo, total) {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("Telegram API credentials not found in environment.");
  }

  const orderLines = cart.map(
    (item, index) =>
      `${index + 1}. ${item.title} (x${item.quantity}) - ${(item.price * item.quantity).toLocaleString()}$`
  );

  const message = [
    "New BitBolt Order!",
    "",
    `Full name: ${customerInfo.fullName}`,
    `Phone: ${customerInfo.phoneNumber}`,
    `Telegram: ${customerInfo.telegram}`,
    `E-mail: ${customerInfo.email || "N/A"}`,
    `Address: ${customerInfo.address}`,
    `Google map: ${customerInfo.mapLocation}`,
    `Mark: ${customerInfo.mark || "N/A"}`,
    "",
    "Items:",
    orderLines.join("\n"),
    "",
    `Total: ${total.toLocaleString()}$`,
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.description || "Telegram API request failed");
  }

  return data;
}
