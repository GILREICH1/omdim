import { ChatState } from "../types/chat";
import { AvailableLanguage } from "../types/translation";
import { Event } from '../types/chat'

export const monthsArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const availableLanguages: AvailableLanguage[] = ['en', 'he', 'ar'];

export const defaultLanguage = 'en';

export const returnValidEvent = (chatState: ChatState): Event => {
    if (!!chatState.isCreatingEvent && !!chatState.eventDate && !!chatState.eventName && !!chatState.eventParticipants) {
        return {
            name: chatState.eventName,
            date: chatState.eventDate,
            participants: chatState.eventParticipants
        }
    } else {
        throw new Error('invalid event')
    }
}
