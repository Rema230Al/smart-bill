## ReceiptVault

Keeping track of paper receipts is a hassle — they get lost, faded, or thrown away before you need them for budgeting or returns. ReceiptVault solves this by letting users scan a receipt, automatically extract its key details using OCR, and save it to a searchable digital record.

## Live Demo

ReceiptVault is deployed and available to try online.

🔗 **Try it here:** https://receiptvault-7iwg.onrender.com

> Note: The application is hosted on Render, so the server may take a few seconds to wake up on the first request.
## Tech Stack

Node.js, Express, MongoDB, JWT authentication, Tesseract.js (OCR)

## Key Features

- Upload/scan a receipt photo → OCR extracts store name, date, and total
- Review and correct extracted data before saving
- Secure user accounts (hashed passwords, JWT-protected routes)
- View and manage all saved receipts

## Architecture

Client-server architecture with a layered backend (routes, services, models) and JWT-based middleware authentication.
