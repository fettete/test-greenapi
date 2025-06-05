import { sendMessage, envSet, isAuthorized } from '../../src/greenapi';
import { sendMessageSchema } from '../../src/schemas';

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
    console.log(`Using chatId: ${chatId}`);

    const response = await sendMessage(chatId, 'Привет, мир!');
    expect(response.status).toBe(200);
    const { error } = sendMessageSchema.validate(response.data);
    expect(error).toBeUndefined();
  });

  test('should return 400 if message is empty string', async () => {
    await expect(sendMessage(chatId, '')).rejects.toMatchObject({
      response: { status: 400 },
    });
  });

  test('should return 400 if chatId is missing', async () => {
    await expect(sendMessage('', 'Hello')).rejects.toMatchObject({
      response: { status: 400 },
    });
  });

  test('should return 400 if chatId is invalid', async () => {
    await expect(sendMessage('123', 'Test')).rejects.toMatchObject({
      response: { status: 400 },
    });
  });
});
