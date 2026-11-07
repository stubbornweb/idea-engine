---
name: idea-grill
description: Grill a raw idea down to a written verdict - PROCEED, REFINE, PARK or REJECT. Use when the user has a new idea, wants to decide whether something is worth building, or asks for an idea decision record.
---

# Idea grill

Turns a raw idea into `IDEA-DECISION.md` — a dated record of what the idea is, what it assumes, and the verdict.

The interrogation is not this skill's job. `mattpocock-skills:grilling` does that, and does it harder than anything written here would. This skill supplies the frame around it: a workspace, an assumption ledger, and a verdict that outlives the conversation.

## Asking

Every question to the user, in every step, goes through `AskUserQuestion`, one question per call:

- **Body:** the question, the one or two facts behind it, and the trade-off axis the options sit on ("speed vs. moat").
- **Options:** two to four concrete answers, your recommendation first and labelled `(Recommended)`. Each description reads `<what it is>. Pros: <…>. Cons: <…>.` The recommended one ends with `Why this is the best choice: <…>.`
- **Between questions:** when the user answers through "Other" with a doubt or a tangent, talk it through in plain text until it settles, then ask the next question.

`grilling`'s design tree still picks which question comes next; this replaces only its rounds.

## 1. Open the workspace

Read [`WORKSPACE.md`](WORKSPACE.md). Agree the slug with the user, then check it against the slug rule there. If the slug breaks the rule, reject it, show the rule and ask for a new slug. Never change the slug yourself.

Create the idea folder. If it already holds `SIGNALS.md`, read it: those are the facts the grilling starts from.

Before asking a single question, write the idea down in the user's own words. One paragraph. Every later step checks itself against this paragraph, so capture what they said, not what you think they meant.

**Done when:** the folder exists under a slug that follows the rule, and it holds the idea as the user framed it.

## 2. Filter it

Read [`FILTERS.md`](FILTERS.md) and mark each filter, using the idea paragraph and any `SIGNALS.md`. Ask the user for the facts you lack.

A fail ends the idea here: go to step 4 with REJECT.

**Done when:** each filter reads pass, fail or unknown, and every fail cites its fact.

## 3. Grill it

Invoke `mattpocock-skills:grilling` on the idea, asking as above.

Track the one thing that skill does not: every claim the idea *depends on* but has not established. These are **assumptions**. "People will pay for this." "The data is available." "Nobody does this well yet." Each is an assumption until something outside this conversation says otherwise.

An assumption is load-bearing when the idea dies if it turns out false. Mark those; they drive everything downstream. Every unknown filter starts the list as a load-bearing assumption.

**Done when:** the grilling reaches its own end, and every assumption raised during it is written down. Assumptions nobody could settle in conversation are not a failure — they are the input to `idea-research`.

## 4. Write the verdict

Read [`VERDICTS.md`](VERDICTS.md) and pick the verdict the evidence supports.

Fill [`IDEA-DECISION-FORMAT.md`](IDEA-DECISION-FORMAT.md) into the workspace as `IDEA-DECISION.md`.

**Done when:** the file names exactly one verdict, and every filter from step 2 and every assumption from step 3 appears in it — each either resolved by the grilling, or listed open with the question that would resolve it. An assumption that appears nowhere in the file was dropped, not handled.

## Where it goes next

- **PROCEED** → `setup-meta-repo`
- **REFINE**, or any load-bearing assumption still open → `idea-research`
- **PARK** / **REJECT** → stop. The record is the deliverable.
