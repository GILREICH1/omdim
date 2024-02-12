import { Bot } from 'grammy';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
if (!TELEGRAM_TOKEN) {
  throw new Error("no telegram API token provided");
}

const bot = new Bot(TELEGRAM_TOKEN);

bot.on("message:text", (ctx) => ctx.reply("Echo: " + ctx.message.text));

bot.start();