---
title: 'Online Assessment Platform Design'
date: '2025-06-16'
description: 'Scalable system architecture for an online assessment and testing platform supporting coding challenges, quizzes, and automated evaluation'
tags: ['distributed-systems', 'infra-style', 'real-time']
slug: 'assessment-platform'
publish_status: 'published'
---

# Online Assessment Platform Design

A competitive programming platform supporting contest-based coding challenges with multi-language code execution.

## Functional Requirements

1. View problems for a specific contest
2. View problem details
3. Submit code to problems (multi-language support)
4. View history of submissions with test cases (first failed test case shown)

## Non-Functional Requirements

1. Availability >> Consistency
2. Isolated and Secure code runtime
3. Low latency on all views < 200ms
4. Complete fault tolerance with proper retry mechanisms

## Core Entities

- Contest, Problem, ProblemSolution, TestCase
- User, UserContestSession, Submission

## API Endpoints

```
GET /v1/contests/{contest_id}/problems → List[Problem]
GET /v1/problems/{problem_id} → Problem
GET /v1/problems/{problem_id}/submissions → List[Submission]
GET /v1/problems/{problem_id}/submissions/{submission_id} → Submission (Long Polling)
POST /v1/problems/{problem_id}/submissions → submission_id
```

## System Architecture

**Client** → **API Gateway** → **Problem Service** → **Problems DB**

**Code Execution Flow:**

1. Submissions queued via **Broker (SQS/Redis)**
2. **Orchestration Workers** compile code and distribute test cases
3. **Executor Workers** run test cases in parallel (Python, C++, etc.)
4. Results aggregated and sent back via callback

## Storage

- **S3**: User code, problem solutions, test case files
- **Redis Cache**: Session management and frequent data
- **Problems DB**: Core entities and relationships
