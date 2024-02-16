enum TslKeys {
    intro = 'intro',
    cancel = 'cancel',
    changeLang = 'changeLang',
    switched = 'switched',
    continue = 'continue',
    newEvent = 'newEvent',
    eventSaved = 'eventSaved',
    infoMissing = 'infoMissing',
    saveDate = 'saveDate',
    saveParticipants = 'saveParticipants',
    confirmName = 'confirmName',
    confirmDate = 'confirmDate',
    confirmParticipants = 'confirmParticipants',
    confirm = 'confirm'
}

type translationMap = Record<TslKeys, string>

const enText: translationMap = {
    intro: "Hi! 😊 Send /new to get started adding a new event!\nSend /help for more options",
    changeLang: 'Send /en to chat in English',
    cancel: 'Cancel',
    switched: 'Switched',
    continue: 'Send /restart to start again',
    newEvent: 'Great let\'s get going! What the name of the event?',
    eventSaved: 'Event saved',
    infoMissing: 'info missing',
    saveDate: 'Great! Now please send the date in the format mm-dd, for example 02-14 for Feb 14th',
    saveParticipants: 'Great! Now please send the list of participants seperated by commas',
    confirmName: 'Name:',
    confirmDate: 'Date: ',
    confirmParticipants: 'Participants',
    confirm: 'Send /confirm to save'
}

const heText: translationMap = {
    intro: "\"הי! 😊 שלח.י \"/new\" כדי להתחיל בהוספת אירוע חדש!\ n\ שלח.י \"/help\" לאפשרויות נוספות\",",
    changeLang: "לצ'אט בעברית, שלח.י /he",
    cancel: 'בטל',
    switched: 'החלפנו',
    continue: 'שלח.י/restart מחדש כדי להתחיל מחדש',
    newEvent: "מעולה בואו נצא לדרך! מה שם האירוע?",
    eventSaved: 'האירוע נשמר',
    infoMissing: 'חסר מידע',
    saveDate: 'מושלם, נא לשלוח את תאריך האירוע בפורמט mm-dd, לדוגמה: 02-14 ל-14 בפברואר',
    saveParticipants: 'גדול! נא לשלוח את רשימת המשתתפים.ות מופרדים.ות בפסיקים',
    confirmName: ':שם',
    confirmDate: 'תאריך: ',
    confirmParticipants: 'משתתפים.ות',
    confirm: 'שלח.י /confirm כדי לשמור'
}


export const dictionary = {
    he: heText,
    en: enText,
    ar: enText
}
