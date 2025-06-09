export const chatIdFormatValidationMessage = "Validation failed. Details: 'chatId' must be one of the next formats: 'phone_number@c.us' or 'group_id@g.us'"
export const fieldNotAllowedEmptyValidationMessage = (field: string) => {
    return `Validation failed. Details: '${field}' is not allowed to be empty`
}
export const jsonUnmarshalCountError = "json: cannot unmarshal number \" into Go struct field RequestBody.Count of type int32"
export const countMustBeMoreThan1 = "Count must be greater than or equal to 1"