---
title: 'Payment Processing HLD'
date: '2025-07-13'
description: 'System architecture for a scalable payment processing platform like Stripe, handling secure transactions, compliance, and multi-party settlements'
tags: ['payments', 'distributed-systems', 'infra-style']
slug: 'payment-system'
publish_status: 'published'
---

# Payment Processing HLD

A payment processing platform like Stripe enabling businesses to accept and manage online payments securely.

## Functional Requirements

1. Merchants can initiate payment requests (charge customer for specific amount)
2. Users can pay with credit/debit cards
3. Merchants can view payment status updates (pending, success, failed)

## System Scale & Non-Functional Requirements

- **10k TPS** peak load
- **99.99% Availability** of payment portal
- **Consistency** per user transaction
- **Data Security** (GDPR, ISO27001 - transit & rest)
- **Strong Data Durability**
- **Horizontal scale** with fault tolerance

## Core Entities

- **Merchants**, **Payment**, **Transaction**

## API Routes

```
POST /v1/payments/ → payment_id [201]
POST /v1/payments/<payment_id>/transactions → [200]
GET /v1/payments/<payment_id> → Payment [200]
```

## System Architecture

**Merchant Client** → **API Gateway** → **Payment Service** ↔ **Transaction Service** → **Payment Gateway** → **External Networks (Visa, Mastercard)**

## Database Design

```sql
Merchant: id, name, bank_details
Payment: id, merchant_id, amount, currency, status
Transaction: id, payment_id, card_details, status
```

## Key Flows

1. **Create Payment**: `POST /v1/payments` with amount/currency
2. **Process Payment**: `POST /v1/payments/<id>/transactions` with card data
3. **Status Updates**: Payment gateway callbacks update transaction status
4. **Get Payment**: `GET /v1/payments/<id>` returns current status

## Security Features

- **Request Signing**: Merchant authentication with signatures & nonces
- **Payment Iframe**: Client-side encryption, tokenization
- **HSM**: Hardware security for private keys
- **PCI DSS**: Merchants don't need compliance

## Scalability

- **Kafka**: Event streaming partitioned by merchant_id (10k msg/sec)
- **Read Replicas**: Scale payment status queries
- **Data Partitioning**: Shard by merchant_id, cold storage to S3
- **Reconciliation Service**: Event sourcing with conflict resolution
