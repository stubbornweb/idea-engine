# Clients meta files

The files `client-intake` adds at the root of `clients-meta`. The agent rules follow ADR 0004 in `stubbornweb/solo-product-studio`.

## AGENTS.md

```markdown
# clients-meta — agent rules

This repository holds the client folders of the studio and `PAINS-INDEX.md`.

## Shared rules

1. Work on a branch and open a pull request. Never push to `main`.
2. Write a failing test first for any code with logic.
3. This repo has no check. Read the full diff before you open a pull request.
4. Write all text in plain English (Simplified Technical English style, CEFR B1).

## Repo rules

- Each client has one folder, `<client-slug>/`. `client-intake` writes it.
- `NOTES.md` in a client folder is append-only.
```

## CLAUDE.md

```markdown
@AGENTS.md
```
