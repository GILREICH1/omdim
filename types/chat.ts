import { Context } from "grammy";
import { AvailableLanguage } from "./translation";

export type MyContext = Context & {
  chatId: string;
};

export enum ChatStage {
  new = 'new',
  nameSaved = 'nameSaved',
  dateSaved = 'dateSaved',
  participantsSaved = 'participantsSaved',
}

export interface ChatState {
  isCreatingEvent: boolean;
  lang: AvailableLanguage;
  creationStage: ChatStage;
  eventName?: string;
  eventDate?: Date;
  eventParticipants?: string;
}
export interface Event {
  name: string;
  date: Date;
  participants: string;
}
