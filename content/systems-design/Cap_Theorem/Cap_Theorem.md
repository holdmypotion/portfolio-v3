---
title: 'CAP Theorem in Distributed Systems'
date: '2025-01-16'
description: 'Visual explanation of the CAP theorem showing the trade-offs between Consistency, Availability, and Partition tolerance in distributed database systems'
tags: ['distributed-systems', 'core-concepts']
slug: 'cap-theorem'
publish_status: 'published'
---

# CAP Theorem in Distributed Systems

The CAP theorem states that in any distributed system, you can only guarantee two out of three properties:

## The Three Properties

- **Consistency (C)**: Same data in both databases - all nodes see the same data simultaneously
- **Availability (A)**: Both databases are available everytime - the system remains operational
- **Partition Tolerance (P)**: If network failure occurs in distributed systems, the overall system should still serve requests

## The Three Possible Combinations

### CP (Consistency + Partition Tolerance)

When network failure occurs between database nodes:

- **Strategy**: Break connection with one database to maintain data consistency
- **Result**: Consistent data across remaining nodes
- **Trade-off**: No availability for the disconnected database
- **Use case**: Banking systems, financial transactions where consistency is critical

### AP (Availability + Partition Tolerance)

When network failure occurs between database nodes:

- **Strategy**: Keep both connections up even when they can't sync
- **Result**: System remains available for reads and writes
- **Trade-off**: Data inconsistency, potential dirty reads
- **Use case**: Social media feeds, content delivery where availability matters more

### CA (Consistency + Availability)

In the absence of network partitions:

- **Strategy**: Shut off the system during network failures
- **Result**: Perfect consistency and availability when network is healthy
- **Trade-off**: No partition tolerance - system goes down during network issues
- **Use case**: Single-node systems, traditional RDBMS setups

## Key Insights

1. **Network partitions are inevitable** in distributed systems
2. **You must choose** between consistency and availability during partitions
3. **Different parts of your system** can make different trade-offs
4. **The choice depends on business requirements** - what matters more for your use case?

## Real-World Examples

- **CP Systems**: HBase, Redis Cluster, MongoDB (with strong consistency)
- **AP Systems**: Cassandra, DynamoDB, CouchDB
- **CA Systems**: Traditional RDBMS (PostgreSQL, MySQL) in single-node setups

The CAP theorem helps architects make informed decisions about distributed system design based on business requirements and acceptable trade-offs.
