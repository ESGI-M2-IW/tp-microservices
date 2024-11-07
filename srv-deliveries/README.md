# Delivery Routes API Documentation

This API provides endpoints to manage delivery operations using Hono framework and Prisma ORM. The base path for all routes is `/deliveries`.

## Installation and Setup

1. Navigate to the deliveries directory:
```bash
cd srv-deliveries
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file with your credentials
# Set your API_KEY and DATABASE_URL
```

Example `.env` file:
```env
DATABASE_URL="mysql://user:password@mysql_url:port/databaseName?ssl-mode=REQUIRED"
API_KEY="your_api_key"
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at: http://localhost:3000/deliveries

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [Setup](#setup)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [Get All Deliveries](#get-all-deliveries)
  - [Get Delivery by Order ID](#get-delivery-by-order-id)
  - [Create New Delivery](#create-new-delivery)
  - [Update Delivery (PUT)](#update-delivery-put)
  - [Update Delivery (PATCH)](#update-delivery-patch)
  - [Delete Delivery](#delete-delivery)

## Setup
```typescript
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
```

## Error Handling
The API includes a centralized error handling mechanism that logs errors and returns a standardized error response:
```json
{
  "message": "An error occurred"
}
```

## Endpoints

### Get All Deliveries
Retrieves all deliveries from the database.

**URL**: `/`  
**Method**: `GET`  
**Success Response**:
- **Code**: 200
- **Content**: Array of delivery objects

**Error Response**:
- **Code**: 404
- **Content**: `{ "message": "No deliveries found" }`

### Get Delivery by Order ID
Retrieves a specific delivery by its order ID.

**URL**: `/:orderId`  
**Method**: `GET`  
**URL Parameters**: 
- `orderId`: Number

**Success Response**:
- **Code**: 200
- **Content**: Delivery object

**Error Responses**:
- **Code**: 400
- **Content**: `{ "message": "Invalid Order ID" }`
- **Code**: 404
- **Content**: `{ "message": "Delivery not found" }`

### Create New Delivery
Creates a new delivery record.

**URL**: `/`  
**Method**: `POST`  
**Request Body**:
```json
{
  "idCourier": "number",
  "idOrder": "number",
  "status": "string",
  "deliveryAddress": "string"
}
```

**Success Response**:
- **Code**: 201
- **Content**: Created delivery object

**Error Responses**:
- **Code**: 400
- **Content**: `{ "message": "Missing required fields: idCourier, idOrder, deliveryAddress or status" }`
- **Code**: 400
- **Content**: `{ "message": "Invalid status provided. Valid statuses are: [status list]" }`

### Update Delivery (PUT)
Updates all fields of a delivery record.

**URL**: `/order/:orderId/courier/:courierId`  
**Method**: `PUT`  
**URL Parameters**:
- `orderId`: Number
- `courierId`: Number

**Request Body**:
```json
{
  "status": "string (optional)",
  "pickup_time": "datetime (optional)",
  "delivery_time": "datetime (optional)",
  "deliveryAddress": "string (optional)"
}
```

**Success Response**:
- **Code**: 200
- **Content**: Updated delivery object

**Error Responses**:
- **Code**: 400
- **Content**: `{ "message": "Invalid Order ID or Courier ID" }`
- **Code**: 400
- **Content**: `{ "message": "No fields to update" }`
- **Code**: 404
- **Content**: `{ "message": "Delivery not found" }`

### Update Delivery (PATCH)
Partially updates a delivery record.

**URL**: `/order/:orderId/courier/:courierId`  
**Method**: `PATCH`  
**URL Parameters**:
- `orderId`: Number
- `courierId`: Number

**Request Body**:
```json
{
  "status": "string (optional)",
  "pickup_time": "datetime (optional)",
  "delivery_time": "datetime (optional)",
  "deliveryAddress": "string (optional)"
}
```

**Success Response**:
- **Code**: 200
- **Content**: Updated delivery object

**Error Responses**:
- **Code**: 400
- **Content**: `{ "message": "Invalid Order ID or Courier ID" }`
- **Code**: 400
- **Content**: `{ "message": "No fields to update" }`
- **Code**: 404
- **Content**: `{ "message": "Delivery not found" }`

### Delete Delivery
Deletes a delivery record.

**URL**: `/order/:orderId/courier/:courierId`  
**Method**: `DELETE`  
**URL Parameters**:
- `orderId`: Number
- `courierId`: Number

**Success Response**:
- **Code**: 204
- **Content**: `{ "message": "Delivery deleted successfully" }`

**Error Responses**:
- **Code**: 400
- **Content**: `{ "message": "Invalid Order ID or Courier ID" }`
- **Code**: 404
- **Content**: `{ "message": "Delivery not found" }`