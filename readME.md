# Redis Rock

## Description

This project is a microservices-based application consisting of three services: `notification-service`, `producer-service`, and `product-service`. Each service is built using Node.js and TypeScript, and they communicate with each other using Redis for event notifications.

## Services

### Notification Service

The `notification-service` handles notifications and uses Redis for event handling.

### Producer Service

The `producer-service` is responsible for producing events and pushing them into Redis.

### Product Service

The `product-service` manages product-related operations and uses Redis for caching and event handling.

## Installation

To install the dependencies for each service, navigate to the service directory and run:

```bash
yarn install