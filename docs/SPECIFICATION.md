<!--
    Filename: SPECIFICATION.md
    Author: Amey Thakur
    GitHub: https://github.com/Amey-Thakur
    Repository: https://github.com/Amey-Thakur/CLAUDE-SPINNER-WORDS
    Release Date: 2026-03-26
    License: MIT

    Description: 
    Scholarly technical specification for the Claude Code CLI spinner mechanism.
    Outlines the configuration protocol, data schema, and implementation architecture.
-->

# Technical Specification: Claude Spinner Words

## 1. Abstract
This document provides a formal technical architecture and implementation protocol for the customization of asynchronous state indicators (verbs) within the Claude Code CLI workstation environment. 

## 2. Architectural Design
The Claude Code CLI (v2.1.23+) employs a modular, configuration-driven interface for UI state feedback. The "spinner" mechanism is a deterministic cycle that iterates through a defined registry of indicator strings during backend processing activities.

### 2.1 Configuration Protocol
System-level customization is achieved via the `settings.json` configuration file. The CLI monitors this file for changes to the `spinner` object at runtime initialization.

*   **Windows Environment**: `%USERPROFILE%\.claude\settings.json`
*   **Unix/macOS Environment**: `~/.claude/settings.json`

### 2.2 Data Schema
The configuration schema requires a structured JSON object under the `spinner` designator:

```json
{
  "spinner": {
    "mode": "replace" | "append",
    "verbs": string[]
  }
}
```

*   **replace**: Truncates the internal "Tengu" registry and implements the custom set as the authoritative source.
*   **append**: Merges the custom set into the existing internal verb collection for expanded variety.

## 3. Implementation Heuristics
1.  **Data Integrity**: Registries must be implemented as strictly-typed JSON arrays. Malformed JSON will cause the CLI to revert to default state indicators.
2.  **State Synchronization**: Configuration updates are read into memory during the CLI boot sequence. Active processes require a restart for state synchronization.
3.  **Orchestration**: Automated pipelines (PowerShell/Bash) are recommended for managing the `read-modify-write` lifecycle of the configuration file to prevent data corruption.

## 4. Visual Synchronization
To ensure visual fidelity across terminal workstations, this registry supports standardized light and dark mode assets.

| Environment Specification | Branded Asset Reference |
| :--- | :--- |
| **Light Mode Fidelity** | `assets/claude-light.png` |
| **Dark Mode Fidelity** | `assets/claude-dark.png` |

## 5. Registry Indices
The project maintains a hierarchical collection of datasets to support varied technical aesthetics.
*   **Official Registry**: Found in `official/` — the canonical codebase source.
*   **Thematic Indices**: Found in `themes/` — professionally curated stylistic extensions.

---
**Authored by Amey Thakur, 2026.**  
Distributed under the MIT License.
