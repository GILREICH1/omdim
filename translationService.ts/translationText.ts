enum TslKeys {
    intro = 'intro',
    cancel = 'cancel',
    changeLang = 'changeLang',
    switched = 'switched',
    continue = 'continue',
    newEvent = 'newEvent',
    eventSaved = 'eventSaved',
    infoMissing = 'infoMissing',
    saveDate = 'saveDate'
}

type translationMap = Record<TslKeys, string>

const enText: translationMap = {
    intro: "Hi! 😊 send /new to get started adding a new event!\nSend /help for more options",
    changeLang: 'send /en to chat in English',
    cancel: 'Cancel',
    switched: 'switched',
    continue: 'Send /continue to continue adding event, send /restart to start again',
    newEvent: 'great let\'s get going! What the name of the event?',
    eventSaved: 'event saved',
    infoMissing: 'info missing',
    saveDate: 'Great! Now please send the date in the format mm-dd, for example 02-14 for Feb 14th'
}

const heText: translationMap = {
    intro: "\"הי! 😊 שלח \"/new\" כדי להתחיל בהוספת אירוע חדש!\ n\ שלח \"/help\" לאפשרויות נוספות\",",
    changeLang: "לצ'אט בעברית, שלח /he",
    cancel: 'בטל',
    switched: 'החלפנו',
    continue: 'שלח /continue כדי להמשיך להוסיף אירוע, שלח /restart כדי להתחיל מחדש',
    newEvent: "מעולה בואו נצא לדרך! מה שם האירוע?",
    eventSaved: 'האירוע נשמר',
    infoMissing: 'חסר מידע',
    saveDate: 'מושלם, נא לשלוח את תאריך האירוע בפורמט mm-dd, לדוגמה: 02-14 ל-14 בפברואר'
}

export const dictionary = {
    he: heText,
    en: enText,
    ar: enText
}
