---
name: idea-grill
description: Grill a raw idea down to a written verdict - PROCEED, REFINE, PARK or REJECT - or change that verdict in a revision round. Use when the user has a new idea, wants to decide whether something is worth building, asks for an idea decision record, or brings research findings or new facts for an idea that has a verdict.
---

# Idea grill

Turns a raw idea into `IDEA-DECISION.md` — a dated record of what the idea is, what it assumes, and the verdict.

The interrogation is not this skill's job. `mattpocock-skills:grilling` does that, and does it harder than anything written here would. This skill supplies the frame around it: a meta repo, an assumption ledger, and a verdict that outlives the conversation.

## Asking

Every question to the user, in every step, goes through `AskUserQuestion`, one question per call:

- **Body:** the question, the one or two facts behind it, and the trade-off axis the options sit on ("speed vs. moat").
- **Options:** two to four concrete answers, your recommendation first and labelled `(Recommended)`. Each description reads `<what it is>. Pros: <…>. Cons: <…>.` The recommended one ends with `Why this is the best choice: <…>.`
- **Between questions:** when the user answers through "Other" with a doubt or a tangent, talk it through in plain text until it settles, then ask the next question.

`grilling`'s design tree still picks which question comes next; this replaces only its rounds.

## 1. Open the meta repo

Run `setup-meta-repo`. When the idea has no decision record yet, tell it that this is a new idea. It agrees the slug with the user and makes or repairs `~/www/<slug>-meta/`. If it stops, stop too.

In `~/www/<slug>-meta/`, start the branch `idea-grill` as "Saving" in [`WORKSPACE.md`](WORKSPACE.md) says.

If `1-idea/IDEA-DECISION.md` exists, this run is a **revision round**. In a revision round, if `PROJECT.md` exists and its `**Stage:**` is not `idea`, stop and tell the user: after the stage `idea`, the Idea Engine does not change the verdict.

If `~/www/clients-meta/PAINS-INDEX.md` exists, read it. Show the user each pain that matches the idea, with its clients and its signals. Those are the facts the grilling starts from.

For a new idea, before asking a single question, write the idea down in the user's own words. One paragraph. Every later step checks itself against this paragraph, so capture what they said, not what you think they meant. In a revision round, the record already has this paragraph: do "Revision round" in place of steps 2 to 4.

**Done when:** `~/www/<slug>-meta/` is on the branch `idea-grill`, the user has seen each matching client pain, and the idea is written down as the user framed it, or this run is a revision round.

## 2. Filter it

Read [`FILTERS.md`](FILTERS.md) and mark each filter, using the idea paragraph and the matching client pains. Ask the user for the facts you lack.

A fail ends the idea here: go to step 4 with REJECT.

**Done when:** each filter reads pass, fail or unknown, and every fail cites its fact.

## 3. Grill it

Invoke `mattpocock-skills:grilling` on the idea, asking as above.

Track the one thing that skill does not: every claim the idea *depends on* but has not established. These are **assumptions**. "People will pay for this." "The data is available." "Nobody does this well yet." Each is an assumption until something outside this conversation says otherwise.

An assumption is load-bearing when the idea dies if it turns out false. Mark those; they drive everything downstream. Every unknown filter starts the list as a load-bearing assumption.

**Done when:** the grilling reaches its own end, and every assumption raised during it is written down. Assumptions nobody could settle in conversation are not a failure — they are the input to `idea-research`.

## 4. Write the verdict

Read [`VERDICTS.md`](VERDICTS.md) and pick the verdict the evidence supports.

Fill [`IDEA-DECISION-FORMAT.md`](IDEA-DECISION-FORMAT.md) as `1-idea/IDEA-DECISION.md`.

**Done when:** the file names exactly one verdict, and every filter from step 2 and every assumption from step 3 appears in it — each either resolved by the grilling, or listed open with the question that would resolve it. An assumption that appears nowhere in the file was dropped, not handled.

## 5. Save the verdict

Save `1-idea/` as "Saving" in [`WORKSPACE.md`](WORKSPACE.md) says. If it went through a pull request, wait until the user has merged it, and also the pull request that `setup-meta-repo` opened in step 1, if there is one. Then run `setup-meta-repo` again: it makes `PROJECT.md` match the verdict, and after REJECT it archives the repo.

**Done when:** `1-idea/` is on the default branch, and `setup-meta-repo` has reported its changes.

## Revision round

A revision round gives a new verdict to an idea that has a decision record, for example after `idea-research`. The record keeps its history: the round edits only the `**Verdict:**` and `**Date:**` lines, and adds one section under "## Revisions". Everything else in the file stays as it is.

### R1. Find the open points

Read `1-idea/IDEA-DECISION.md` and every findings file in `1-idea/research/`. The **open points** are each filter that reads unknown and each assumption that is still open, in "Filters", "Assumptions" and in every earlier revision.

Ask the user the reason for the new round: research findings, a new fact, or the PARK trigger fired. Show each open point with the findings and facts that bear on it.

**Done when:** the user has given the reason, and has seen each open point with its findings.

### R2. Grill the open points

Invoke `mattpocock-skills:grilling` on the open points and the reason, asking as above. Ask only about these. A point that the record already settled stays settled. Track each new assumption as step 3 says.

**Done when:** each open point is resolved, or still open with the question that would resolve it.

### R3. Write the new verdict

Read [`VERDICTS.md`](VERDICTS.md) and pick the verdict the evidence supports. It can be the same verdict.

In `1-idea/IDEA-DECISION.md`, set the `**Verdict:**` line to the new verdict and the `**Date:**` line to today. Add a section under "## Revisions", as [`IDEA-DECISION-FORMAT.md`](IDEA-DECISION-FORMAT.md) shows. Then do step 5.

**Done when:** the two header lines show the new verdict and today's date, the new section names every open point from R1 and every new assumption from R2, and the rest of the file is unchanged.

## Where it goes next

- **PROCEED** → `project-brief`
- **REFINE**, or any load-bearing assumption still open → `idea-research`, then a revision round
- **PARK** → stop. When the trigger fires, run a revision round.
- **REJECT** → stop. REJECT is final.
