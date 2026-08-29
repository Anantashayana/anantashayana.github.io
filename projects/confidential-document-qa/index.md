---
title: Confidential Document Q&A
date: 2024-03-01
tags: ['Python', 'ChromaDB', 'LangChain', 'RAG']
summary: A multimodal retrieval pipeline for on-premise document Q&A, with a vector storage layer and API integration for text and image inputs.
github: 
demo: 
---

Architected a multimodal retrieval pipeline for **on-premise** document Q&A —
letting users ask questions over confidential documents without data leaving
their infrastructure.

## What it does

Ingests documents and answers natural-language questions about them using
retrieval-augmented generation (RAG). Because it runs on-premise, sensitive and
confidential material never leaves the local environment.

## Highlights

- Designed the **vector storage layer** using ChromaDB for fast semantic retrieval.
- Built a **multimodal** pipeline handling both text and image inputs.
- Integrated the retrieval and generation stages behind a clean API.

## Stack

Python, ChromaDB, LangChain.
