---
title: S3 Deep Dive — Storage Classes, Lifecycle & Access Patterns
date: 2025-03-10 10:00:00
author: Anantashayana
tags: ['aws', 's3', 'storage']
category: AWS
description: A practical look at S3 storage classes, lifecycle policies, and how to pick the right access pattern for your workload.
---

# S3 Deep Dive — Storage Classes, Lifecycle & Access Patterns

S3 is deceptively simple on the surface. You put objects in, you get them out. But once you're running anything at scale the decisions around storage classes, lifecycle rules, and access patterns start to matter a lot — both for cost and for latency.

---

## Storage Classes

| Class | Use case | Retrieval |
|---|---|---|
| Standard | Frequently accessed data | Milliseconds |
| Standard-IA | Infrequent access, still needs fast retrieval | Milliseconds |
| One Zone-IA | Non-critical, reproducible data | Milliseconds |
| Glacier Instant | Archive, accessed a few times per year | Milliseconds |
| Glacier Flexible | Archive, accessed rarely | Minutes–hours |
| Glacier Deep Archive | Long-term compliance storage | Up to 12 hours |
| Intelligent-Tiering | Unknown or changing access patterns | Milliseconds |

**Rule of thumb:** if you don't know the access pattern, start with Intelligent-Tiering. It moves objects between tiers automatically and the monitoring fee is small compared to the savings.

---

## Lifecycle Policies

Lifecycle rules let you automate transitions and expirations. A typical pattern for log storage:

```json
{
  "Rules": [
    {
      "ID": "log-lifecycle",
      "Status": "Enabled",
      "Transitions": [
        { "Days": 30,  "StorageClass": "STANDARD_IA" },
        { "Days": 90,  "StorageClass": "GLACIER_IR" },
        { "Days": 365, "StorageClass": "DEEP_ARCHIVE" }
      ],
      "Expiration": { "Days": 2555 }
    }
  ]
}
```

---

## Access Patterns to Know

- **Multipart upload** — use for objects > 100 MB. Below that, single PUT is simpler and cheaper.
- **Transfer Acceleration** — routes uploads through CloudFront edge nodes. Useful when clients are geographically spread.
- **S3 Select** — run SQL queries directly on objects (CSV, JSON, Parquet). Pulls only the columns you need instead of the full object.
- **Presigned URLs** — time-limited URLs that let clients upload/download directly without going through your backend. Keep the expiry short (15 min or less for uploads).

---

## Gotchas

- **Eventual consistency is gone** — since Dec 2020 S3 provides strong read-after-write consistency for all operations. No more workarounds needed.
- **Minimum storage duration** — Standard-IA and One Zone-IA charge for a minimum of 30 days. Glacier classes have 90-day minimums. Storing and immediately deleting costs you the full minimum.
- **Request costs add up** — PUT/COPY/POST/LIST are $0.005 per 1,000 requests. At high object counts this can exceed storage costs.
