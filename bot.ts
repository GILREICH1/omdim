import {Bot} from 'grammy';
import {ChatStage, ChatState, MyContext} from './types/chat';
import {dictionary} from './translationService.ts/translationText';
import chatStateDB, {
  saveChatToDB,
} from "./controllers/databaseControllers";
import {switchToHebrew, switchToArabic, switchToEnglish} from './controllers/languageControllers';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
if (!TELEGRAM_TOKEN) {
  throw new Error("no telegram API token provided");
}
const bot = new Bot<MyContext>(TELEGRAM_TOKEN);
bot.use(saveChatToDB)

bot.command("he", switchToHebrew);
bot.command("ar", switchToArabic);
bot.command("en", switchToEnglish);


bot.start();