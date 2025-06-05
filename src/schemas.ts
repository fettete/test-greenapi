import Joi from 'joi';

export const sendMessageSchema = Joi.object({
  idMessage: Joi.string().required()
});

export const chatHistorySchema = Joi.array().items(
  Joi.object({
    type: Joi.string().valid('incoming', 'outgoing').required(),
    idMessage: Joi.string().required(),
    timestamp: Joi.number().required(),
    typeMessage: Joi.string().required(),
    chatId: Joi.string().pattern(/^\d+@(c|g)\.us$/).required(),
    textMessage: Joi.string().required(),

    extendedTextMessage: Joi.object({
      text: Joi.string().required(),
      description: Joi.string().allow(''),
      title: Joi.string().allow(''),
      previewType: Joi.string().allow('None'),
      jpegThumbnail: Joi.string().allow(''),
      forwardingScore: Joi.number().required(),
      isForwarded: Joi.boolean().required()
    }).required(),

    statusMessage: Joi.string().allow(''),
    sendByApi: Joi.boolean().required(),
    deletedMessageId: Joi.string().allow(''),
    editedMessageId: Joi.string().allow(''),
    isEdited: Joi.boolean().required(),
    isDeleted: Joi.boolean().required()
  })
);
