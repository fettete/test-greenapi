import { getChatHistory, sendMessage, envSet, isAuthorized } from '../../src/greenapi';
import { chatHistorySchema } from '../../src/schemas';

describe('getChatHistory API', () => {
    const message = 'Test message for chat history';
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

    test('should return chat history successfully (200)', async () => {
        await sendMessage(chatId, message);

        const response = await getChatHistory(chatId, 1);

        expect(response.status).toBe(200);
        const { error } = chatHistorySchema.validate(response.data);
        expect(error).toBeUndefined();

        expect(response.data[0].textMessage).toEqual(message);
    });

    test('should return 400 if invalid chatId is provided', async () => {
        const invalidChatId = 'invalidChatId';

        await expect(getChatHistory(invalidChatId, 1)).rejects.toMatchObject({
            response: {
                status: 400,
            },
        });
    });

    test('should return empty history if there are no messages (200)', async () => {
        const emptyChatId = '77713456398@c.us';

        const response = await getChatHistory(emptyChatId, 1);

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(0);
    });

    test('should validate response structure', async () => {
        const response = await getChatHistory(chatId, 1);

        expect(response.status).toBe(200);

        const { error } = chatHistorySchema.validate(response.data);
        expect(error).toBeUndefined();
    });
});
