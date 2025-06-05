import axios from 'axios';
import dotenv from 'dotenv';
import { sleep } from './util';

dotenv.config();

const idInstance = process.env.ID_INSTANCE || '';
const apiTokenInstance = process.env.TOKEN_INSTANCE || '';;

const apiUrl = `https://api.green-api.com/waInstance${idInstance}`;

export function envSet(): boolean {
    if (!idInstance || !apiTokenInstance) {
        return false;
    }
    return true;
}

export async function getStateInstance(): Promise<string> {
  const url = `${apiUrl}/getStateInstance/${apiTokenInstance}`;

  return (await axios.get(url)).data.stateInstance;
}

export async function isAuthorized(): Promise<boolean> {
  let stateInstance = await getStateInstance();
  return stateInstance === 'authorized';
}

export async function sendMessage(chatId: string, message: string) {
  const url = `${apiUrl}/sendMessage/${apiTokenInstance}`;

  await sleep(3000); // Sleep for 3 seconds to make sure the message was recorded in journal

  return axios.post(url, {
    chatId: chatId,
    message: message
  });
}

export async function getChatHistory(chatId: string, count: number) {
  const url = `${apiUrl}/getChatHistory/${apiTokenInstance}`;

  await sleep(1000); // Sleep for 1 second to avoid rate limiting

  return axios.post(url, {
    chatId: chatId,
    count: count
  });
}
