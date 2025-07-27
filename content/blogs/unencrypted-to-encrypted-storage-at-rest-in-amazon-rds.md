---
title: 'Zero-Downtime Migration: Moving from Unencrypted to Encrypted Storage at Rest in Amazon RDS'
date: '2025-07-27'
tags: ['cloud', 'devops']
slug: 'zero-downtime-migration-amazon-rds-encryption'
description: "A step-by-step guide to migrating a live Amazon RDS instance from unencrypted to encrypted storage at rest with near-zero downtime, using AWS DMS, snapshots, and best practices."
publish_status: 'published'
---

## Introduction

In today’s security-conscious world, encrypting data at rest is not just a best practice—it’s often a compliance requirement. When our company set out to achieve ISO certification, one of the critical gaps we identified was that our production Amazon RDS instances were not encrypted at rest. Migrating a live, business-critical database to encrypted storage, with zero downtime, posed a unique set of challenges. Here’s how we tackled it.

## The Problem Space

**Encryption at rest** in AWS RDS means that all data stored on disk, including automated backups, read replicas, and snapshots, is encrypted using AWS Key Management Service (KMS). However, AWS does not allow you to simply “turn on” encryption for an existing RDS instance. Instead, you must create a new, encrypted instance and migrate your data.

For us, the stakes were high:
- Our production RDS instance served all live traffic.
- The database was over 4TB in size.
- We needed to ensure zero downtime and data consistency.
- Any misstep could impact the entire company’s operations.

## Evaluating the Options

### Option 1: Blue/Green Deployments

**Blue/green deployment** is a popular strategy for minimizing downtime during database upgrades or migrations. AWS RDS even offers native support for blue/green deployments. However, there’s a catch:  
> **RDS blue/green deployments do not support migrations from unencrypted to encrypted storage.**  
This is a hard limitation in AWS. You cannot use blue/green to switch from an unencrypted to an encrypted RDS instance.

### Option 2: Snapshot & Restore

Another approach is to take a **snapshot** of your unencrypted RDS instance, encrypt it using KMS and restore it as an encrypted instance, and then cut over. While this works in theory, it comes with several major drawbacks for large databases:

- **Data Drift & Consistency:** The original database remains available during the snapshot and restore process. However, if you continue to accept writes on the source database, any changes made after the snapshot will not be present in the new, encrypted instance. This means you either have to stop all writes (resulting in downtime) or risk data drift, making this approach unsuitable for zero-downtime migrations.
- **Extended Downtime:** For a 4TB database, the snapshot restore and encryption process itself can take 4-6 hours. If you require perfect data consistency, you must stop all writes during this period, effectively making your database unavailable for the duration.
- **Hydration Problem:** AWS RDS uses lazy loading for restored instances. After cutover, the new instance may experience slow performance as data is loaded from S3 on-demand, leading to unpredictable application behavior and potential performance bottlenecks for end users.

### Option 3: Logical Replication (DMS)

AWS Database Migration Service (DMS) allows for **ongoing logical replication** between RDS instances. This means you can keep your new, encrypted instance in sync with your production database, minimizing downtime to just the final cutover.

## Our Solution: Staged Migration with DNS Failover

Given the limitations above, we designed a **staged migration plan** that leveraged DMS and DNS-based failover to achieve near-zero downtime.

### Step-by-Step Plan

1. **Create Encrypted RDS Instance:**  
   - Take a snapshot of the unencrypted production instance.
   - Restore it as a new, encrypted RDS instance.
   
   > **Why use a snapshot?**
   > AWS DMS only replicates data, not table metadata, indexes, or auto-increment settings. Creating your encrypted target instance from a snapshot ensures all schema details, indexes, and table properties are preserved. DMS will then keep the data in sync, but it will not recreate these structural elements for you.

2. **Set Up Replication Chain and Prepare Target Data:**  
   - Establish a replication chain:  
     `Prod Master → Read Replica → Encrypted Prod Master`
   - Use AWS DMS to replicate ongoing changes from the unencrypted to the encrypted instance.
   
   > **Handling Existing Data on the Target:**
   > When configuring DMS, you can choose what to do with existing data on the target: DROP, TRUNCATE, or DO NOTHING. The simplest and most reliable approach is to TRUNCATE all tables in the target database, then let DMS perform a FULL LOAD followed by Change Data Capture (CDC) to keep the databases in sync. This ensures a clean slate and avoids data drift.
   >
   > **Tip:** Before starting the full load, disable foreign key checks (e.g., `SET foreign_key_checks = 0;` in MySQL) to prevent validation errors during ingestion. Re-enable them after the load completes.
   >
   > **Advanced:** If you want to minimize the initial load, you can grab the exact binlog position at the time of snapshot creation and use that as the starting point for AWS DMS. This allows DMS to only replicate changes made after the snapshot, reducing the amount of data to transfer. However, for most migrations, the TRUNCATE + FULL LOAD + CDC approach is simpler and less error-prone.

3. **Monitor Replication Lag:**  
   - Continuously monitor the replication lag until it reaches zero seconds, ensuring the encrypted instance is fully caught up.

4. **Validation and Performance Testing:**  
   - Validate data integrity by comparing row counts, checksums, or running application queries against both the source and encrypted target.
   - Point analytics tools (e.g., Metabase) to the new encrypted instance for functional validation.
   - Perform load testing on the encrypted instance to ensure it meets performance and stability requirements before cutover.

5. **DNS-Based Cutover:**  
   - Update DNS and database endpoints in our production services to point to the new encrypted instance.
   - Perform the DNS switch during a scheduled maintenance window (we achieved this with just a 10-minute maintenance page).

6. **Failback Mechanism:**  
   - Maintain a robust rollback plan via DNS, allowing us to revert quickly if any issues arose.

## Results & Learnings

- **Zero Downtime:** The migration was completed with only a brief 10-minute maintenance window.
- **Compliance Achieved:** We met ISO certification requirements for encryption at rest.
- **Improved Security:** Our database infrastructure is now more secure and compliant.
- **Robust Rollback:** DNS-based failover provided an excellent failsafe.
- **Risk Mitigation:** Breaking the migration into smaller, reversible steps reduced risk.
- **Thorough Testing:** Rigorous testing and monitoring at each stage were crucial.
- **Stakeholder Communication:** Clear documentation and communication helped manage expectations and ensured a smooth migration.

## Conclusion

Migrating a production RDS instance from unencrypted to encrypted storage at rest is a complex, high-stakes operation—especially for large, business-critical databases. By carefully evaluating all options, understanding AWS limitations, and designing a staged, reversible migration plan, we achieved our goals with minimal disruption. If you’re facing a similar challenge, invest in planning, testing, and communication. The payoff is a secure, compliant, and resilient database infrastructure.

