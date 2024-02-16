import { dictionary } from "../translationService.ts/translationText";
import { MyContext } from "../types/chat";
import chatStateDB from "./databaseControllers";

export const switchToHebrew = (ctx: MyContext) => {
    chatStateDB[ctx.chatId].lang = 'he';
    ctx.reply(dictionary.he.switched);
  }

export const switchToEnglish = (ctx: MyContext) => {
    chatStateDB[ctx.chatId].lang = 'en';
    ctx.reply(dictionary.ar.switched);
  }

export const switchToArabic = (ctx: MyContext) => {
    chatStateDB[ctx.chatId].lang = 'ar';
    ctx.reply(dictionary.ar.switched);
  }
