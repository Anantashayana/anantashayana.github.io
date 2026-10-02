---
title: Big Data & Streaming
date: 2026-09-20 
author: Anantashayana
tags: ['aws', 'Big-Data', 'Streaming']
category: AWS
description: Untangling IAM users, roles, and policies — with a clear mental model for when to use each one.
---

# Big Data & Streaming

## EMR

- Hadoop, Sprak, Flink, Presto, Hive, HBase
- MapReduce exists but is largely replaced by Spark.
- EMR runtime roles allow fine-grained access control for individual workloads without exposing permissions at the instance level.
- Instance profiles are **instance-level permissions**.
- EMR security configurations can disable metadata access (IMDS) but not runtime
    - Used in Amazon EMR to set up data encryption (at rest and in transit), Kerberos authentication, and authorization for EMRFS.
    - Used in Amazon EMR to set up data encryption (at rest and in transit), Kerberos authentication, and authorization for EMRFS.
- Deployment
    - **EMR on EC2** — classic, full cluster control
    - **EMR Serverless** — no cluster management, auto-scales, pay-per-job — good when workloads are spiky/unpredictable
    - **EMR on EKS** — run Spark jobs on an existing Kubernetes cluster if you're already EKS-centric and want unified compute

## Glue

- Serverless ETL (extract, transform, load)
- Job Type
    - Spark (most common, distributed)
    - **Python Shell** (single-node, lightweight scripts/small data)
    - **Ray** (newer, for Python-native distributed ML/data workloads)
- Glue isn't only batch; it can consume directly from Kinesis Data Streams/MSK for near-real-time ETL, an alternative to Firehose+Lambda for some patterns.

### Glue data catalouge

- Hive metastore
- Glue Data Catalog stores table/schema metadata; a crawler discovers supported data/schema metadata, while ETL jobs transform data.
- A crawler does not convert CSV to Parquet just by discovering it.
    - only catalog data; they do not transform it.

### Glue databrew

- visual data preparation tool that enables users to clean and normalize data without writing any code

## Lakeformation

- Lake Formation automates building a data lake and provides a centralized place for data governance and security
    - Centralized Security and Fine-Grained Access
        - grants access at **database/table/column/row level** via its own permission model layered
    - Data Discovery and Cataloging (Glue catalouge)
    - **Governed Tables:** It supports ACID (Atomicity, Consistency, Isolation, Durability) transactions on S3 data
    - **management and security layer**. (Does not store data)
    - Does not execute queries. It gives permission to external engines (like Athena or EMR) to read the data.
    - uses **resource links** for cross-account table sharing.
        - acting as a local pointer to a shared resource located in a producer (owner) account
        - RAM to share data
- **Amazon Redshift Spectrum**, Redshift can query data sitting out in your S3 data lake. When Redshift tries to do this, **AWS Lake Formation** checks the security permissions to make sure the Redshift user is allowed to see that specific data, right down to the column or row level.
- AWS Lake Formation uses a process called credential vending to issue temporary, scoped-down security credentials instead of relying on long-term IAM keys or direct Amazon S3 permissions.
    - **a security pattern where a data catalog or governance service (such as [Apache Gravitino](https://gravitino.apache.org/docs/1.3.0/security/credential-vending/) or Databricks Unity Catalog) dynamically generates short-lived, least-privilege cloud storage credentials (like temporary AWS IAM tokens, STS keys, or GCS tokens) for external query engines**.

## S3 Select

- Filters a supported individual object's contents using SQL, not a general multi-object query engine. Supports CSV/JSON/Parquet with format-specific compression restrictions.
- **No longer available to new customers.** Evaluate Athena for new SQL-over-S3 datasets.
- Glacier Flexible Retrieval/Deep Archive objects need restoration before ordinary access. The original “retrieve from Glacier and use Select” advice needs storage-class, restore and eligibility context.

## Athena

- Serverless interactive SQL queries on data in S3
- Pay per query (based on data scanned)
- Trino/Presto engine
- To run a query, a database needs to know the "schema" (the columns, data types, and rows). Athena integrates tightly with the **AWS Glue Data Catalog**
- Athena is a serverless query engine on S3, while BigQuery is a fully managed data warehouse.
- Performance
    - Athena supports result reuse when configured and eligible; it does not necessarily rescan the source on every repeated query.
    - If your query has a WHERE clause on a partition column, this is also where partition pruning happens.
        - Partition pruning is **a query optimization technique that skips reading unnecessary data partitions or folders on disk**
        - It ignores all partitions that do not match the filter value.
- Athena itself holds no standing credentials of its own for your data.  by default it's serverless and acts entirely as you, using your assumed IAM role's permissions for every single one of these calls. ( Or lake formation)
    - Build an Amazon QuickSight Dashboard
    - Export and Share
    - **presigned URL** for the specific query result file in S3.
- Athena Federated Query
    - Non S3 data sources
    - With LambdA

## QuickSight

- **Private data sources:** a VPC connection creates ENIs. Configure routes, DNS, subnets, security groups and NACLs to reach supported private databases/on-premises sources.
- This data-source connection differs from a PrivateLink endpoint used to access the service itself.
- [VPC setup](https://docs.aws.amazon.com/quick/latest/userguide/vpc-setup-for-quicksight.html)
- QuickSight supports connecting to both Amazon S3 (via Athena) and RDS for PostgreSQL as data sources.
    - because S3 is a storage service, not a query engine.
- Not real time
    - **built primarily as a Business Intelligence (BI) reporting platform rather than a low-latency operational dashboard**.
    - Polling Overhead on datasource
    - SPICE (Super-fast, Parallel, In-memory Calculation Engine), requires data to be imported and stored in memory.
- **Lack of Streaming Ingestion:** QuickSight does not natively connect to real-time message brokers like Amazon Kinesis Data Streams or Apache Kafka as a live push consumer; it expects relational, data warehouse, or batch-oriented inputs.
- If you need true sub-second or second-by-second streaming visualization (such as for IoT or live metrics), tools like Amazon Managed Grafana paired with time-series databases like Amazon Timestream or Amazon OpenSearch are better suited.

## Appflow

- ingesting data from SaaS to AWS

## Redshift

- **Audit export:** optional S3 or CloudWatch delivery; system-table logging is separate. User activity logs require `enable_user_activity_logging`. Serverless audit export uses CloudWatch.
- The documented S3 audit-export path supports SSE-S3 and requires Object Lock off. This is not a restriction on every Redshift use of S3/KMS.
- [Redshift audit logging](https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing.html)
- Redshift provides a managed analytical warehouse with storage/query optimizations. Compare repeated/concurrent workloads using benchmarks rather than declaring an unconditional winner.
- **RA3 nodes** (compute/storage separation)
    - legacy instances (like DC2 or DS2)
- Redshift Serverless
- Choose **Redshift Native Queries** if you require the **absolute fastest query performance** for frequent, highly structured enterprise BI dashboards, complex joins, and heavy relational workloads where data is copied entirely into internal Redshift storage.
- Choose **Redshift Spectrum** if you **already own a Redshift cluster** and need to run federated queries that join massive, historical, or cold datasets residing in **Amazon S3** with highly structured, frequently updated local warehouse tables
- Elastic / Classic Resize
    - Manual/Scheduled and permanent
    - Read-only or brief write-blocking states during the data redistribution phase.
- **Amazon Redshift Concurrency Scaling**
    - **automated feature that temporarily adds extra compute capacity**
    - **handle sudden bursts of concurrent queries**.

- Migration
    - Same VPC
    - Amazon Redshift Simple Replay Utility
    - AWS IAM roles with `redshift:ResizeCluster` permissions
    - use Redshift Data Sharing to migrate workloads
- **Amazon Redshift Elastic Resize**
    - A fast scaling feature that adds or removes nodes, or changes node types, within an existing cluster in minutes
        - Reconfigures your existing cluster directly to the target node type (`ra3` or `rg`).
    - Does not automatically delete rows marked for deletion; you must ensure the new configuration has adequate storage space
    - **Downtime:** Minimal (typically 10-15 minutes). The cluster remains read-only during the operation, and the endpoint remains unchanged.
- Amazon Redshift Snapshot Restore
    - Brand new cluster from existing
    - Zero downtime, but manually sync CDC
- Classic Resize
    - Used as a fallback when the target node type configuration or sizing scale is not supported by Elastic Resize (e.g., single-node to multi-node transitions)

# Kinesis Data Streams: a replayable conveyor belt

- A **real-time data streaming platform**
- Push-based ingestion
- Shard-based scaling (within that shard, order is preserved)
    - Kinesis uses **shards**, while Kafka uses **partitions**
    - Partitioning happens on **one machine**. Sharding happens across **many machines**.
- Data is **not deleted when read.**
- Handle backpressure: Scale out, fan out, buffer downstream (lambda+sqs)
- Consumption has two models.
    - shared-throughput consumers
        - poll using GetRecords
        - 200-millisecond latency
        - a shared limit of 2 MB per second and 5 transactions per second per shard
    - Enhanced fan-out
        - Each registered consumer gets a **dedicated** 2MB/sec/shard
        - If customers are experiencing throttling
        - lower latencies down to roughly 70 millisecond
        - up to 50 EFO
- Consumer: processing layer (Lambda/Firehouse/EC2)
- **On-demand vs. provisioned capacity mode**
    - One demand
        - Scales automatically up to double your previous 30-day peak write throughput.
    - Provisioned
        - Manually specify and manage the exact number of shards.
        - Manually scale
        - Predictable, stable, or high-volume data streams where steady usage makes provisioned billing more cost-effective than metered data
- KCL (Kinesis Client Library): manages shard iteration/checkpointing for custom consumers.

## Amazon Data Firehose

- Pipe, not a storage: Batching-and-delivering Not Instantly
- Buffering hints control when a batch gets flushed and delivered
    - **Buffer size**
    - Buffer interval
    - Whichever is met first triggers delivery.
- Lambda transformation changes record content with custom logic.
- Built-in record-format conversion can convert supported JSON input into Parquet/ORC using a schema; this is distinct from Lambda transformation.
- Why?
    - Kinesis Data Streams cannot directly write the output to S3. In addition, KDS does not offer plug-and-play integration with an intermediary Lambda function as Firehose does. You will need to do a lot of custom coding to get the Lambda function to process the incoming stream and then reliably dump the transformed output to S3. So this option is incorrect.
- **~ Kafka Connect sink connector / Logstash/Fluentd output plugin**
- Only one destination
    - S3 Backup/Fallback Exception
    - **separate Firehose delivery streams** for each destination,
- **Dynamic partitioning** to S3 (auto-partition by a data field, avoiding a separate ETL step).
- Destination: (Not EBS, as it's managed by EC2)
    - Kinesis Data Streams is an ingestion source, not a destination in the supported destination list.
    - Not DynamoDB
    - Firehose is purposely built to stream data directly into data lakes, warehouses, and analytics tools like Amazon S3, Amazon Redshift, Amazon OpenSearch, Snowflake, Splunk, or HTTP endpoints.

# Additional streaming and analytics services

## Amazon MSK

- Managed Apache Kafka for applications that need Kafka APIs, tooling, or ecosystem compatibility.
- Compare partitioning, ordering, consumer groups, replay, retention, networking, and operational responsibility with Kinesis.

## Amazon Managed Service for Apache Flink

- Stateful stream processing: windows, event time, aggregations, and stream joins.
- Checkpoint/state recovery and backpressure matter; ingestion throughput is not the same as processing capacity.

## Amazon OpenSearch Service

- Search and analytical exploration over indexed data; useful for search/log analytics workloads.
- Index lifecycle, shard sizing, mappings, and ingestion latency affect cost and performance; it is not interchangeable with a transactional database.
- fast full-text search, real-time log analytics, or application monitoring on large data volumes

### **Amazon MWAA (Managed Workflows for Apache Airflow)**

- Airflow

# Other

- DynamoDB streams
- DMS CDC
- Kinesis Data Streams vs Kafka/MSK vs SQS vs SNS vs EventBridge — know when each fits (ordered replay stream vs pub-sub fan-out vs simple queue vs event bus with routing rules).

# Service Matrix

| Need | Service | Why / notes |
| --- | --- | --- |
| Run Spark/Hadoop/Presto/Hive/HBase/Flink with full cluster control | **EMR (on EC2)** | Full control over cluster config, instance types, bootstrap actions |
| Same, but spiky/unpredictable workload, don't want to manage cluster sizing | **EMR Serverless** | Auto-scales per job, pay-per-use |
| Same, but org already standardized on EKS/Kubernetes | **EMR on EKS** | Reuses existing K8s compute/ops model |
| Serverless ETL: discover schema + transform data (Spark-based, large data) | **Glue (Spark job)** | Fully managed, serverless, integrates natively with Data Catalog |
| Small, single-node ETL script, not big-data scale | **Glue (Python Shell job)** | Lighter weight than spinning up Spark for trivial scripts |
| ETL directly on a live stream (Kinesis/MSK), not batch | **Glue Streaming ETL** or **Kinesis Data Analytics/Managed Flink** | Glue streaming = simpler transform-and-land;
Flink = complex stateful processing (windows, joins, event time) |
| Just need to discover/catalog schema, no transformation | **Glue Crawler → Glue Data Catalog** | Crawlers only populate metadata, never transform data |
| No-code visual data cleaning | **Glue DataBrew** | Business-analyst-friendly, no Spark/code needed |
| Centralized fine-grained access control (row/column/table) over a data lake | **Lake Formation** | Governance/permission layer, doesn't store or query data itself |
| ACID transactions on S3-based tables | **Lake Formation Governed Tables** (or increasingly, open table formats like Apache Iceberg via Glue/EMR) | Adds transactional consistency to what's otherwise eventually-consistent object storage |
| Ad-hoc SQL query directly on S3 data, pay-per-query, no infra | **Athena** | Serverless, uses Glue Catalog for schema, Trino/Presto engine |
| Query a non-S3 source (RDS, DynamoDB, CW Logs) via SQL without moving data | **Athena Federated Query** | Uses Lambda connectors per source type |
| Query S3 data *from within* a Redshift cluster, joined with warehouse tables | **Redshift Spectrum** | Best when you need to join lake data with existing warehouse tables in one query |
| Need a full managed data warehouse: complex joins, BI at scale, heavy concurrent reporting | **Redshift** (provisioned or Serverless) | Athena/Spectrum are query-on-demand; Redshift is a persistent warehouse optimized for repeated heavy analytical workloads |
| Pull data from SaaS apps (Salesforce, Slack, Zendesk, etc.) into S3/Redshift | **AppFlow** | Purpose-built SaaS connector service, no custom API integration code |
| Visual BI dashboards/reports over S3(via Athena)/Redshift/RDS | **QuickSight** | Not real-time; batch/warehouse-oriented; SPICE for in-memory speed |
| True sub-second live dashboards (IoT, live metrics) | **Managed Grafana + Timestream/OpenSearch** | QuickSight explicitly isn't built for this — noted correctly in your file |
| High-throughput, ordered, replayable real-time ingestion; multiple custom consumers reading independently | **Kinesis Data Streams** | Data persists (not deleted on read), consumers can replay, shard-based scale |
| Same, but you need Kafka-specific APIs/ecosystem/tooling | **Amazon MSK** | Managed Kafka — partition-based (not shard-based), for teams with existing Kafka tooling/skills |
| Automatically batch-and-deliver a stream into S3/Redshift/OpenSearch/Splunk/HTTP endpoint, with optional format conversion | **Kinesis Data Firehose** | Not for custom multi-consumer processing — it's a managed delivery pipe, single destination per stream |
| Complex stateful stream processing: windowed aggregations, event-time joins | **Managed Service for Apache Flink** | For real analytics logic on the stream itself, not just delivery |
| React to item-level changes in a DynamoDB table | **DynamoDB Streams (+ Lambda)** | Different primitive from Kinesis — table change capture, not general-purpose streaming |
| Capture ongoing changes from a relational database (CDC) into a stream/warehouse | **DMS (with CDC)** | Database-specific change capture, can target Kinesis/S3/Redshift as sink |
| Full-text search / log analytics / app monitoring over indexed data | **OpenSearch Service** | Not a general analytics warehouse — optimized for search and log/time-series analytics |
| Orchestrate a multi-step pipeline across Glue/EMR/Athena/Lambda | **Step Functions** | State-machine style orchestration, native AWS integration |
| Orchestrate existing Airflow DAGs without self-hosting | **MWAA** | For teams migrating from self-managed Airflow |