---
title: 'Lessons from AWS DynamoDB Outage: The Cascading Failure That Shook US-East-1'
date: '2025-10-23'
tags: ['aws', 'dynamodb', 'devops', 'cloud']
slug: 'aws-outage-dynamodb-summary'
description: "A deep dive into the October 2025 AWS DynamoDB outage that caused cascading failures across multiple services, and the critical lessons for building resilient cloud systems."
publish_status: 'published'
---

# When DNS Goes Wrong: Lessons from AWS's October 2025 Outage

What began as a "DynamoDB experiencing increased error rates" quickly escalated into one of the most complex outages I've seen in recent years. As someone who's spent some time building and maintaining cloud infrastructure, this incident hit close to home – it's the kind of failure that keeps engineers awake at night.

## The Night Everything Broke

At 11:48 PM PDT on October 19th, AWS customers in US-East-1 started experiencing something that seemed impossible: DynamoDB simply stopped working. Not degraded performance, not partial failures – complete DNS resolution failures that made the service unreachable.

What made this particularly concerning was how quickly it cascaded. Within hours, EC2 instance launches were failing, Lambda functions were timing out, and even basic AWS console logins were broken. It was a stark reminder of how interconnected our cloud infrastructure has become.

**Important clarification**: This wasn't a general AWS DNS failure. The DNS issue was specifically within DynamoDB's internal DNS management system, but because so many AWS services depend on DynamoDB, this single service failure caused a cascading outage across the entire region.

## The Root Cause: A Race Condition That Shouldn't Have Happened

The technical details are fascinating. DynamoDB's DNS management system uses two components working together:

- A **DNS Planner** that monitors load balancer health and creates DNS plans
- A **DNS Enactor** that applies these plans to Route53 (running redundantly across 3 availability zones)

The race condition that caused this outage was the kind of edge case that's nearly impossible to test for in production. Here's what happened:

1. One DNS Enactor got stuck with unusual delays while applying an older plan
2. Meanwhile, another Enactor rapidly applied a newer plan and triggered its cleanup process
3. The delayed Enactor finally caught up and overwrote the newer plan with its older version
4. The cleanup process then deleted this older plan, removing all IP addresses from the DNS record
5. The system entered an inconsistent state that prevented any further updates

The result? `dynamodb.us-east-1.amazonaws.com` became completely unresolvable – not just for customers, but for other AWS services that depend on DynamoDB.

**The critical detail**: This wasn't a general DNS failure across AWS. It was specifically a bug in DynamoDB's internal DNS management automation that caused the service's regional endpoint to become unresolvable.

## The Domino Effect

The DNS failure didn't just affect DynamoDB – it triggered a cascade across AWS's entire ecosystem:

**Direct Dependencies (Services that directly use DynamoDB):**
- **EC2**: The DropletWorkflow Manager (DWFM) couldn't maintain leases with physical servers, making new instance launches impossible
- **Lambda**: Functions couldn't be created or updated, and event source processing failed
- **STS/IAM**: Authentication services completely broken
- **Redshift**: Cluster operations and query processing failed
- **Connect**: Customer service platform lost core functionality

**Indirect Effects (Services affected by the EC2 issues):**
- **Network Load Balancer**: Health checks started failing due to network propagation delays from EC2 launch failures
- **ECS/EKS/Fargate**: Container services affected by EC2 launch failures

**The Timeline:**
- **11:48 PM - 2:40 AM**: DynamoDB DNS failure and direct service impacts
- **2:25 AM - 1:50 PM**: EC2 instance launch failures due to DWFM lease issues
- **5:30 AM - 2:09 PM**: NLB health check failures due to network propagation delays

It's a perfect example of how a single point of failure in a foundational service can bring down an entire cloud platform.

## The Human Side of Incident Response

What I found most impressive was AWS's response. They detected the root cause within 50 minutes (12:38 AM) and had temporary mitigations running by 1:15 AM. By 2:25 AM, DNS was fully restored, though it took until 2:40 AM for all cached DNS records to expire.

However, the recovery wasn't complete at that point. The cascading effects continued:
- **5:28 AM**: EC2 launches resumed after DWFM recovered
- **10:36 AM**: Network propagation normalized
- **2:09 PM**: NLB fully recovered
- **2:15 PM**: Lambda and other services fully operational

The incident response team had to manually intervene to restore DNS state – there was no automated recovery mechanism for this particular failure mode. This highlights something important: no matter how much we automate, some failures will always require human judgment and intervention.

## What We Can Learn (Without Playing Armchair Architect)

I want to be careful here. It's easy to sit back and suggest solutions when you're not the one who built and operates a system at AWS's scale. However, there are some general principles that this incident reinforces:

### 1. DNS is More Critical Than We Think

Most of us treat DNS as "just" a name resolution service, but this outage shows it's actually critical infrastructure. When DNS fails, everything fails. The lesson here isn't about specific technical solutions, but about treating DNS management with the same rigor we apply to database management.

**Key insight**: This wasn't a general DNS failure – it was a specific bug in DynamoDB's internal DNS management automation. But the impact was just as severe because so many services depend on DynamoDB.

### 2. Cascading Failures Are Inevitable

In complex distributed systems, failures will cascade. The question isn't whether they'll happen, but how well we can contain them. This incident shows that even AWS, with all their engineering resources, can't prevent every cascade.

**The cascade pattern**: DynamoDB DNS failure → EC2 DWFM can't check droplet state → EC2 launches fail → Network Manager can't propagate configs → NLB health checks fail → Multiple services lose load balancing.

### 3. Automation Needs Human Oversight

The DNS management system that failed was highly automated, which is generally good. But it also created a new failure mode that required manual intervention to resolve. This is a reminder that automation should enhance human capabilities, not replace human judgment entirely.

### 4. Testing Can't Cover Everything

This race condition was the kind of edge case that's nearly impossible to reproduce in testing. It required a very specific sequence of events with unusual timing. This doesn't mean we shouldn't test – it means we should design systems that can recover from unexpected failures.

## AWS's Response: Learning and Improving

What I appreciate most about AWS's response is their transparency. They've already:
- Disabled the problematic DNS automation worldwide
- Committed to fixing the race condition before re-enabling automation
- Added velocity controls for NLB capacity removal
- Improved throttling mechanisms for data propagation systems
- Building additional test suites to exercise recovery workflows

**Specific improvements mentioned:**
- Fixing the race condition in DynamoDB DNS management
- Adding protections to prevent incorrect DNS plan application
- Improving DWFM recovery workflow testing
- Rate limiting based on queue size in EC2 data propagation systems


## What This Means for the Rest of Us

For those of us building systems on top of AWS (or any cloud provider), this incident reinforces some important principles:

- **Design for failure**: Assume that even foundational services can fail
- **Monitor everything**: Especially the services you depend on most
- **Plan for manual intervention**: Not everything can be automated
- **Test your assumptions**: Regularly verify that your monitoring and alerting actually work
- **Learn from others**: Read post-mortems like this one and think about how similar failures might affect your systems

## Final Thoughts

This outage was significant, but it's also a testament to how far cloud infrastructure has come. Twenty years ago, a DNS failure would have taken down entire data centers for days. Today, even a complex cascading failure like this was resolved in hours.

**The key takeaway**: This wasn't a general AWS DNS failure, but rather a specific bug in DynamoDB's internal DNS management that cascaded through the entire ecosystem. It's a powerful reminder that in distributed systems, even a single service's internal automation can bring down an entire platform.

The key is learning from these incidents and using them to build more resilient systems. AWS is doing that, and we should too.

---

*This analysis is based on AWS's official incident report published on October 22, 2025. The full technical details can be found in [AWS's official post-mortem](https://aws.amazon.com/message/101925/).*

