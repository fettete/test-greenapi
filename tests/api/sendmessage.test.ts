import { AxiosError } from 'axios';
import { sendMessage, envSet, isAuthorized } from '../../src/greenapi';
import { sendMessageSchema } from '../../src/schemas';
import { chatIdFormatValidationMessage, fieldNotAllowedEmptyValidationMessage } from '../../src/constants';

describe('Green API: sendMessage', () => {
  let chatId: string;

  beforeAll(async () => {
    chatId = process.env.CHAT_ID || '';
    if (!chatId) throw new Error('CHAT_ID is not set');
    if (!envSet()) throw new Error('ID_INSTANCE or TOKEN_INSTANCE is not set');

    const authorized = await isAuthorized();
    if (!authorized) {
      throw new Error('Instance is not authorized');
    }
  });

  test('should send a message successfully (200)', async () => {
    const response = await sendMessage(chatId, 'Привет, мир!');
    expect(response.status).toBe(200);
    const { error } = sendMessageSchema.validate(response.data);
    expect(error).toBeUndefined();
  });

  test('should return 400 if message is empty string', async () => {
    try {
      await sendMessage(chatId, '');
    } catch (err) {
      if (err instanceof AxiosError) {
        expect(err.response?.status).toBe(400);
        expect(err.response?.data?.message).toBe(fieldNotAllowedEmptyValidationMessage("message"));
      } else {
        throw err;
      }
    }
  });

  test('should return 400 if chatId is missing', async () => {
    try {
      await sendMessage('', 'Test');
    } catch (err) {
      if (err instanceof AxiosError) {
        expect(err.response?.status).toBe(400);
        expect(err.response?.data?.message).toBe(fieldNotAllowedEmptyValidationMessage("chatId"));
      } else {
        throw err;
      }
    }
  });

  test('should return 400 if chatId is invalid', async () => {
    try {
      await sendMessage('123', 'Test');
    } catch (err) {
      if (err instanceof AxiosError) {
        expect(err.response?.status).toBe(400);
        expect(err.response?.data?.message).toBe(chatIdFormatValidationMessage);
      } else {
        throw err;
      }
    }
  });
});
