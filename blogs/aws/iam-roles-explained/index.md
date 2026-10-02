---
title: IAM Roles Explained — When to Use What
date: 2025-03-18 10:00:00
author: Anantashayana
tags: ['aws', 'iam', 'security']
category: AWS
description: Untangling IAM users, roles, and policies — with a clear mental model for when to use each one.
---

# IAM Roles Explained — When to Use What

IAM is one of those things that looks straightforward until you're three layers deep in a trust policy wondering why an EC2 instance can't write to S3. Here's the mental model I use.

---

## Users vs Roles vs Policies

- **User** — a permanent identity with long-lived credentials. Use for humans (with MFA) or legacy tooling that can't assume roles. Avoid for services.
- **Role** — a temporary identity. No passwords or access keys attached. A principal (EC2, Lambda, another account) *assumes* the role and gets short-lived credentials. This is what you want for services.
- **Policy** — a JSON document that says what actions are allowed or denied on which resources. Attached to users, roles, or groups.

---

## Trust Policy vs Permission Policy

Every role has two policy types:

```json
// Trust policy — who can assume this role
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "lambda.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}

// Permission policy — what the role can do
{
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::my-bucket/*"
  }]
}
```

A common mistake is getting these backwards — putting actions in the trust policy or forgetting to update the trust policy when moving a role between services.

---

## Cross-Account Access

To let Account B access a resource in Account A:

1. In Account A — create a role with a trust policy that allows Account B's root or a specific role to assume it.
2. In Account B — attach a policy to the user/role that allows `sts:AssumeRole` on the Account A role ARN.
3. Both sides have to agree. One side alone isn't enough.

---

## Least Privilege in Practice

- Start with AWS managed policies to get something working quickly.
- Use CloudTrail + IAM Access Analyzer to see what's actually being called.
- Scope down to only those actions and resources.
- Set a calendar reminder to review permissions quarterly — they drift.

---

## Common Gotchas

- **Permission boundaries** — a ceiling on what a role can do, even if its policies allow more. Often the reason something works in staging but not production.
- **Resource-based policies** — S3 bucket policies, SQS queue policies, KMS key policies. These are separate from identity policies and both have to allow the action.
- **Session duration** — assumed roles default to 1 hour. Increase with `--duration-seconds` up to the role's max (12 hours). Long-running jobs need this.
