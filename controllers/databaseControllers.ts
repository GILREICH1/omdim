import { NextFunction } from "grammy";
import { availableLanguages, defaultLanguage, monthsArr } from "../utils";
import { AvailableLanguage } from "../types/translation";
import { ChatStage, ChatState, MyContext } from "../types/chat";

const chatStateDB: Record<string, ChatState> = {};

export const saveChatToDB = async (ctx: MyContext, next: NextFunction,) => {
  const chatId = ctx?.chat?.id.toString();
  if (!chatId) throw new Error('no chat id received from Telegram');
  ctx.chatId = chatId;
  if (chatStateDB.hasOwnProperty(chatId)) {
    await next();
    return;
  }
  const userLanguageCode = ctx.from?.language_code || defaultLanguage;
  const chatLanguage = availableLanguages.includes(userLanguageCode as AvailableLanguage) ? userLanguageCode as AvailableLanguage : defaultLanguage;
  chatStateDB[chatId] = {
    isCreatingEvent: false,
    lang: chatLanguage,
    creationStage: ChatStage.name
  };
  await next();
}
