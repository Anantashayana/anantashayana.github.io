---
title: Post-Quantum Blockchain
date: 2024-06-01
tags: ['Python', 'Ethereum', 'XMSS', 'Cryptography']
summary: A quantum-resistant blockchain built from scratch using post-quantum cryptographic algorithms (XMSS, LMS), in collaboration with Unisys.
github: 
demo: 
---

Built a quantum-resistant blockchain from scratch, implementing post-quantum
cryptographic algorithms (XMSS and LMS) in place of traditional signatures.
Done in collaboration with **Unisys**, where I led the technical implementation
phase.

## What it does

Traditional blockchains rely on ECDSA signatures, which are vulnerable to
attacks from sufficiently powerful quantum computers. This project replaces
those signatures with hash-based, quantum-resistant schemes so the chain stays
secure in a post-quantum world.

## Highlights

- Implemented **XMSS** (eXtended Merkle Signature Scheme) and **LMS** (Leighton–Micali Signatures) from the ground up.
- Integrated the post-quantum signature layer into a working blockchain, replacing classical cryptography end to end.
- Led the technical implementation phase in collaboration with Unisys.

## Stack

Python, Ethereum concepts, XMSS/LMS hash-based signatures.
