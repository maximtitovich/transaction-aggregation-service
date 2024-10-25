# Transaction Aggregation Service

This project is a NestJS application that provides an API for aggregating transaction data using a mocked service. It utilizes in-memory Redis and MongoDB to cache and manage transaction data efficiently.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoint](#api-endpoint)
- [Example Request](#example-request)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/transaction-aggregation-service.git


Navigate to the project directory:

bash

cd transaction-aggregation-service

Install the dependencies:

bash

    npm install

Running the Application

To run the application, execute the following command:

bash

npm run start

The application will start and listen on port 3000 by default.
API Endpoint

To aggregate transaction data, you can call the following endpoint:

bash

GET http://localhost:3000/transactions/aggregate

Query Parameters

    userId: The ID of the user whose transactions you want to aggregate.
    startDate: The start date for filtering transactions (in ISO 8601 format).
    endDate: The end date for filtering transactions (in ISO 8601 format).

Example Request

You can use tools like Postman or cURL to make requests to the API. Here’s an example of how to call the endpoint:

bash

curl -X GET "http://localhost:3000/transactions/aggregate?userId=41bbdf81-735c-4aea-beb3-3e5f433a30c5&startDate=2023-03-01T00:00:00.000Z&endDate=2023-03-31T23:59:59.999Z"

Expected Response

The response will contain the aggregated transaction data for the specified user within the given date range.

json

{
  "balance": 18.8,
  "earned": 1.2,
  "spent": 12,
  "payout": 30,
  "paidOut": 30
}

License

This project is licensed under the MIT License - see the LICENSE file for details.