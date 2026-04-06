---
title: "Building Systems That Last: Lessons from Backend Engineering"
date: "2026-03-15"
excerpt: "What I've learned about designing backend systems that survive real-world chaos — from database migrations to distributed failures."
category: "Engineering"
featured: true
tags: [backend, architecture, systems-design]
slug: "building-systems-that-last"
---

# Building Systems That Last

There's a particular kind of confidence that comes from deploying a system you know won't break at 3 AM. Not because you've tested every edge case — you haven't — but because you've designed it to fail gracefully.

Over the past few years of building backend systems with Spring Boot, PostgreSQL, and various microservice architectures, I've accumulated a set of principles that I keep returning to. None of them are revolutionary. Most are obvious in hindsight. But they've saved me more times than any clever algorithm.

## Start With the Failure Mode

Most engineers design for the happy path first. I used to do the same. But the systems that survive are the ones where you ask *"what happens when this breaks?"* before you ask *"how does this work?"*

When I was building the fare collection system for Yugo, we had to handle scenarios where:
- The QR scanner loses connectivity mid-transaction
- The database is temporarily unreachable
- A payment gateway times out after 30 seconds

Each of these required a different strategy. Retry with backoff. Local queue with eventual sync. Idempotent operations. The happy path was easy — it was the failure modes that defined the architecture.

## Database Migrations Are a Contract

I learned this the hard way. A migration isn't just a SQL file — it's a promise to every service that depends on that schema. When you rename a column, you're breaking a contract.

The approach I now follow:

1. **Additive first** — add the new column, populate it, then deprecate the old one
2. **Never delete in the same release** — give consumers time to migrate
3. **Test migrations against production-sized data** — a migration that works on 1,000 rows can timeout on 10 million

```sql
-- Step 1: Add new column (release v2.1)
ALTER TABLE transactions ADD COLUMN payment_method VARCHAR(50);

-- Step 2: Backfill data (background job)
UPDATE transactions SET payment_method = 
  CASE WHEN legacy_type = 1 THEN 'qr_scan'
       WHEN legacy_type = 2 THEN 'nfc_tap'
       ELSE 'unknown' END;

-- Step 3: Remove old column (release v2.3, after all services updated)
ALTER TABLE transactions DROP COLUMN legacy_type;
```

## The Monitoring Tax

Every system you build has a monitoring tax. If you're not paying it, you're accumulating debt that will compound at the worst possible time.

For every service I deploy, I set up:
- **Health checks** — not just "is the process running?" but "can it actually serve requests?"
- **Structured logging** — JSON logs with correlation IDs that let you trace a request across services
- **Alerting on trends, not thresholds** — a sudden 20% increase in p95 latency is more useful than "latency > 500ms"

> The best monitoring setup is the one that wakes you up *before* users notice, and lets you go back to sleep knowing exactly what happened.

## Simplicity as Architecture

The most important architectural decision I've made repeatedly is choosing *not* to add complexity. Not every problem needs a message queue. Not every service needs to be its own microservice. Not every database needs to be distributed.

A well-structured monolith with clear module boundaries will outperform a poorly designed microservice architecture in every way that matters: development speed, debugging, deployment, and operational cost.

The question isn't "should we use microservices?" — it's "do we have the operational maturity to run them?"

## What I'm Still Learning

I don't have all the answers. I'm still figuring out:
- How to balance technical debt against feature velocity
- When to optimize for developer experience vs. system performance
- How to write documentation that people actually read

But I've come to believe that the best systems aren't the most sophisticated ones — they're the ones that are simple enough to understand, robust enough to survive, and flexible enough to evolve.

That's what I'm building toward.
