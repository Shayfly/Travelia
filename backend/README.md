# Travelia Backend

Express API server powering the Travelia demo app.

## Scripts

- `npm run dev` - start dev server
- `npm start` - start server
- `npm test` - run tests (currently none)

Create a `.env` file based on the project root `.env.example` and set these
variables:

```
TRAVELPAYOUTS_API_KEY=your_api_key
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASS=pass
FROM_EMAIL=website@example.com
TO_EMAIL=contact@example.com
```

The contact route POST `/api/contact` uses these SMTP settings to send form
submissions.
