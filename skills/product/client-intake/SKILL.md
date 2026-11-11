---
name: client-intake
description: Client intake - turn a pasted job post or client message into Mom Test questions, and the client's reply into an intake, a proposal and logged pains. Use when the user pastes a job post (Upwork, Useme) or a client's message or reply.
---

# Client intake

Turns one client conversation into `INTAKE.md`, `PROPOSAL.md` and rows in `PAINS-INDEX.md`. When the same pain shows up at three clients, it becomes an idea.

**Written-first:** you draft, the user reviews and sends. Client-facing text is in the client's language; everything else is in English.

All files go into `~/www/clients-meta/`. Each time you stop, save them as "Saving" in [`WORKSPACE.md`](../idea-grill/WORKSPACE.md) says.

## 1. Open the client folder

Read [`WORKSPACE.md`](../idea-grill/WORKSPACE.md). If `~/www/clients-meta/` does not exist, run `gh repo view stubbornweb/clients-meta`. If the repo does not exist, tell the user that you will make the private repo `stubbornweb/clients-meta`, and wait for a "yes". Then run `gh repo create stubbornweb/clients-meta --private --add-readme`. Clone it with `gh repo clone stubbornweb/clients-meta ~/www/clients-meta`.

Start the branch `client-intake/<client-slug>` as "Saving" in `WORKSPACE.md` says. Add each file of [`CLIENTS-META-FILES-FORMAT.md`](CLIENTS-META-FILES-FORMAT.md) that is missing.

Create `<client-slug>/` and append the pasted input to `NOTES.md` verbatim, under a dated heading with its source link.

If the folder already exists, read `NOTES.md` and resume at the first step whose **Done when** is unmet. A pasted reply usually means step 3.

`NOTES.md` is append-only: the post, the questions sent, every reply, your working notes.

When the client sends example sites, in the post or in any reply, add one line for each to `EXAMPLES.md` in the client folder: a link, and what the client likes about it, in the client's words. Write **unknown** when the client did not say. `project-brief` copies these lines into the brief.

```markdown
- [acme-gym.com](https://acme-gym.com): "the booking calendar is so easy"
```

When the client sends work samples, save each file in `<client-slug>/work-samples/`, and add one line for each to `NOTES.md`: the file name and what it shows. A sample that still holds a customer's personal data stays out of the folder: tell the user, and ask the client for a copy without it.
_Worth testing. Source: https://github.com/stubbornweb/solo-product-studio/blob/main/docs/sources/2026-11-11-ai-assessment-interview.md_

**Done when:** `NOTES.md` holds the input, dated, with its source, `EXAMPLES.md` holds every example site in the input, and `work-samples/` holds every work sample in it.

## 2. Draft the questions

Read [`MOM-TEST.md`](MOM-TEST.md) and [`DEMAND-SIDE-SALES.md`](DEMAND-SIDE-SALES.md). Separate what they asked for from the progress they want, then draft 5–7 questions toward the progress.

The message has exactly three parts: one line saying you read the post, the numbered questions, one line saying a proposal follows their answers.

Append it to `NOTES.md`, show it to the user, and stop. The user sends it.

**Done when:** every question passes every check under "Each question", the set covers every item under "The set", and the user has the message.

## 3. Read the reply

Append the reply to `NOTES.md` verbatim, and add its example sites and work samples as in step 1. Sort every answer into a bucket from [`MOM-TEST.md`](MOM-TEST.md). Fill the four forces and the trigger from [`DEMAND-SIDE-SALES.md`](DEMAND-SIDE-SALES.md). Write all of it to `NOTES.md`.

If the struggling moment or the cost is still unknown, draft up to 3 more questions and stop, as in step 2. One extra round at most; after it, unknown stays unknown.

**Done when:** the four forces, the trigger, the struggling moment and the cost each hold a fact from the replies or read **unknown** in `NOTES.md`.

## 4. Write the intake

Fill [`ONE-SCREEN-FORMAT.md`](ONE-SCREEN-FORMAT.md) as `INTAKE.md`, for the user. The Risk section carries the client's anxieties.

**Done when:** it fits one screen, every number traces to a fact in `NOTES.md`, and the workflow diff shows today and after.

## 5. Write the proposal

Read [`WIN-WITHOUT-PITCHING.md`](WIN-WITHOUT-PITCHING.md). If a walk-away condition holds, tell the user which one in a line and go to step 6.

Otherwise fill [`PROPOSAL-FORMAT.md`](PROPOSAL-FORMAT.md) as `PROPOSAL.md` and show it to the user.

**Done when:** every check in `WIN-WITHOUT-PITCHING.md` passes, and the user would send it as written. When they rewrite it, the rewrite points at the rule that failed: fix the proposal and name that rule to the user.

## 6. Log the pains

Read [`PAINS-INDEX-FORMAT.md`](PAINS-INDEX-FORMAT.md). List every distinct struggling moment in `NOTES.md`, not only the pain in `INTAKE.md`. For each one, add this client to the matching row of `PAINS-INDEX.md`, or add a new row.
_Worth testing. Source: https://github.com/stubbornweb/solo-product-studio/blob/main/docs/sources/2026-11-11-ai-assessment-interview.md_

When a row reaches 3 clients, add its signals section, with one entry per client. When the row already has a signals section, add an entry for this client.

**Done when:** each struggling moment in `NOTES.md` puts the client on exactly one row, and every row with 3+ clients has a signals section with one entry per client.

## Where it goes next

- A row that reached 3 clients → `idea-grill` on that pain.
- Otherwise → stop. The user sends the proposal.
