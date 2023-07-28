# WhatsApp API with Node.js

This is a Node.js server-side implementation of the WhatsApp API that provides endpoints for sending messages and media to WhatsApp users. The API requires authentication for accessing the endpoints.

## Prerequisites

Before using the WhatsApp API, make sure you have the following:

- Node.js installed on your system
- A WhatsApp Business account or a verified WhatsApp account

## Installation

1. Clone the repository or download the source code files.

2. Navigate to the project directory in your terminal.

3. Install the dependencies by running the following command:

   ```shell
   npm install
   ```

4. Set up the necessary environment variables. Create a `.env` file in the project directory and add the following variables:

   ```dotenv
   API_KEY=your_api_key
   ```

   Replace `your_api_key` with your actual API key and secret obtained from the WhatsApp Business API provider.

5. Start the server by running the following command:

   ```shell
   npm start
   ```

   The server will start running on the specified port (default: 3000).

## Usage

### Check if a Phone Number is Registered on WhatsApp

Endpoint: `POST /check`

This endpoint allows you to check if a phone number is registered on WhatsApp.

Example request body:
```json
{
  "phone_number": "+1234567890"
}
```

Example response:
```json
{
  "status": 1
}
```

- `status` is `1` if the phone number is registered on WhatsApp, `0` otherwise.

### Send a Message with Media

Endpoint: `POST /message-media`

This endpoint allows you to send a message with media (image, video, or audio) to a WhatsApp user.

Example request body:
```json
{
  "phone_number": "+1234567890",
  "url": "https://example.com/image.jpg",
  "message": "Check out this image!"
}
```

Example response:
```json
{
  "status": 1
}
```

- `phone_number` is the recipient's phone number in international format.
- `url` is the URL of the media file to be sent.
- `message` is an optional message to accompany the media.

### Send a Text Message

Endpoint: `POST /message`

This endpoint allows you to send a text message to a WhatsApp user.

Example request body:
```json
{
  "phone_number": "+1234567890",
  "message": "Hello, how are you?"
}
```

Example response:
```json
{
  "status": 1
}
```

- `phone_number` is the recipient's phone number in international format.
- `message` is the text message to be sent.

## Error Handling

If an error occurs during the execution of an API request, a JSON response with `status` set to `0` will be returned, along with an appropriate error message.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and use it in your own applications.