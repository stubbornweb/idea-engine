# Diagnosis format

`DIAGNOSIS.md` in the client folder. The writing rules of [`ONE-SCREEN-FORMAT.md`](../client-intake/ONE-SCREEN-FORMAT.md) apply. It can be longer than one screen: the ranked list fits one screen, and each demo item adds one section.

````markdown
# <Client>: diagnosis

**Date:** YYYY-MM-DD   **People interviewed:** <n>

**All items together:** €<low>–€<high> a year.

## Ranked list

| # | Pain | Money a year | Build | Price | Demo |
|---|---|---|---|---|---|
| 1 | <in their words> | €<low>–€<high> | <site, app or AI workflow> | €<n>–€<n> | [demo](demos/<item-slug>/) |
| 2 | … | … | … | … | [demo](demos/<item-slug>/) |
| 3 | … | … | … | … | none |

## 1. <the pain in five words>

```diff
 <who wants what>
-  <today's step>
+  <the step after>
```

- **Money:** <the math from the Money line>
- **Demo:** <what it shows. For an AI workflow: "<person>: <result>, <time>. AI: <result>, <time>.">

## 2. <the pain in five words>

<Same shape as item 1.>

## Next step

The build proposal follows. The diagnosis fee comes off its first invoice when you accept a build within 60 days.
````

## Rules

- **Money a year** for each item is the Money line from `NOTES.md`. **unknown** stays **unknown**, and it does not count in "All items together".
- Only the top 2 items have a demo and their own section.
