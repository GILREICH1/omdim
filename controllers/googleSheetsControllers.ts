import { google } from 'googleapis';
import { Event } from '../types/chat'

export const saveEvent = async (event: Event) => {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    //@ts-ignore
    const googleSheets = google.sheets({ version: "v4", auth: client });

    //@ts-ignore
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[event.name, event.date, event.participants]],
        },
    });
}
