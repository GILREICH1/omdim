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
    creationStage: ChatStage.new
  };
  await next();
}

export const saveName = async (ctx: MyContext) => {
  if (!ctx?.message?.text) return;
  const currentUser = chatStateDB[ctx.chatId];
  const currentLanguage = currentUser.lang;

  const text = ctx.message.text;
  currentUser.eventName = text;
  currentUser.creationStage = ChatStage.nameSaved;
  ctx.reply(dictionary[currentLanguage].saveDate)
}

export const saveDate = async (ctx: MyContext) => {
  if (!ctx?.message?.text) return;

  const text = ctx.message.text;
  const date = new Date(`${text}-2024`);
  // TODO validate date

  const currentUser = chatStateDB[ctx.chatId];
  currentUser.creationStage = ChatStage.dateSaved;
  ctx.reply(dictionary[currentLanguage].saveParticipants)
}

export const saveParticipants = async (ctx: MyContext) => {
  if (!ctx?.message?.text) return;
  const text = ctx.message.text;
  const currentUser = chatStateDB[ctx.chatId];
  currentUser.eventParticipants = text;
  currentUser.creationStage = ChatStage.participantsSaved;
  await confirmEvent(ctx);
}

export const confirmEvent = async (ctx: MyContext) => {
  const currentUser = chatStateDB[ctx.chatId];
  if (!currentUser.eventDate) throw new Error('no date saved');
  const day = currentUser.eventDate.getDate();
  const month = currentUser.eventDate.getMonth();
  const monthString = monthsArr[month];
  ctx.reply(`Send /confirm to save event '${currentUser.eventName}' on ${day} of ${monthString}`);
}

export default chatStateDB;
