import {Bot} from 'grammy';
import {ChatStage, ChatState, MyContext} from './types/chat';
import {dictionary} from './translationService.ts/translationText';
import chatStateDB, {
  confirmEvent,
  saveChatToDB,
  saveDate,
  saveName,
  saveParticipants
} from "./controllers/databaseControllers";
import {switchToHebrew, switchToArabic, switchToEnglish} from './controllers/languageControllers';
import {returnValidEvent} from './utils';
import { saveEvent } from "./controllers/googleSheetsControllers";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
if (!TELEGRAM_TOKEN) {
  throw new Error("no telegram API token provided");
}

const bot = new Bot<MyContext>(TELEGRAM_TOKEN);
bot.use(saveChatToDB)

bot.command("start", (ctx) => {
    const currentUser = chatStateDB[ctx.chatId];
    const currentLang = currentUser.lang;
    ctx.reply(dictionary[currentLang].intro);
  }
)

bot.command("new", (ctx) => {
  const currentUser = chatStateDB[ctx.chatId];
  const currentLang = currentUser.lang;
  chatStateDB[ctx.chatId].isCreatingEvent = true;
  ctx.reply(dictionary[currentLang].newEvent);
});

bot.command("he", switchToHebrew);
bot.command("ar", switchToArabic);
bot.command("en", switchToEnglish);

bot.command("help", (ctx) => {
  const currentUser = chatStateDB[ctx.chatId];
  const currentLang = currentUser.lang;
  
  if (currentUser.isCreatingEvent) {
    ctx.reply(dictionary[currentLang].continue)
  } else {
    ctx.reply(dictionary[currentLang].intro);
  }
  ctx.reply("לצ'אט בעברית, שלח /he");
  ctx.reply("Hi! To chat in Arabic, send /ar");
  ctx.reply("Hi! To chat in English, send /en");
});


bot.command('confirm', async (ctx) => {
  const currentUser: ChatState = chatStateDB[ctx.chatId];
  const currentLang = currentUser.lang;

  try {
    const event = returnValidEvent(currentUser)
    await saveEvent({
      name: event.name,
      participants: event.participants,
      date: event.date
    })
    delete currentUser.eventName
    delete currentUser.eventDate
    delete currentUser.eventParticipants
    currentUser.creationStage = ChatStage.name;
    currentUser.isCreatingEvent = false;
    ctx.reply(dictionary[currentLang].eventSaved)
  } catch (e) {
    // TODO error handling
    console.log(e);
    ctx.reply(dictionary[currentLang].infoMissing)
  }
})

bot.on("message", (ctx) => {
  const currentUser = chatStateDB[ctx.chatId];
  const currentLang = currentUser.lang;
  if (currentUser.isCreatingEvent) {
    switch (currentUser.creationStage) {
      case ChatStage.name:
        saveName(ctx);
        break;
      case ChatStage.date:
        saveDate(ctx);
        break;
      case ChatStage.participants:
        saveParticipants(ctx);
        break;
      case ChatStage.complete:
        confirmEvent(ctx);
        break;
    }
  } else {
    ctx.reply(dictionary[currentLang].intro);
  }
});


bot.start();

export default bot;
