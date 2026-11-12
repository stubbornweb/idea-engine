---
name: project-brief
description: Write 1-idea/PROJECT-DESCRIPTION.md in a meta repo - what is being built, for whom, the success targets, the references, and what is explicitly out of scope. Use after setup-meta-repo has written PROJECT.md, or when an existing project has no brief.
---

# Project brief

Turns a PROCEED verdict into `1-idea/PROJECT-DESCRIPTION.md` — the document every later decision on the project gets checked against.

A brief earns its keep through what it *excludes*. A description that would fit twelve different products has defined nothing.

## 1. Check the input

Run this skill in `~/www/<slug>-meta/`. Start the branch `project-brief` as "Saving" in [`WORKSPACE.md`](../idea-grill/WORKSPACE.md) says. If the repo has no `PROJECT.md` at its root, stop and tell the user to run `setup-meta-repo` first.

Read `1-idea/IDEA-DECISION.md`, plus anything in `1-idea/research/`.

If the verdict is not PROCEED, say so and stop. A brief written over a REFINE launders an open question into a commitment — the exact failure this chain exists to prevent.

If the project has no decision record at all (an existing project being documented late), reconstruct one by asking the user the questions in [`VERDICTS.md`](../idea-grill/VERDICTS.md) under PROCEED. That takes minutes and it is the whole foundation.

If `PROJECT.md` has a `**Client:**` line, read `~/www/clients-meta/<client-slug>/EXAMPLES.md`, if it exists.

**Done when:** you can state, in one sentence each, the first user and the problem in that user's words.

## 2. Draft against the template

Fill [`PROJECT-DESCRIPTION-FORMAT.md`](PROJECT-DESCRIPTION-FORMAT.md).

Carry the research findings in as constraints, not as prose. "Existing tools return results in 2-4s at 10k notes" is a constraint on what this must beat. A finding that survives into the brief as background colour should have been cut at `idea-research`.

**Done when:** every section of the template has content, and every claim in it traces to the decision record, the research, or an answer the user gave you just now. Nothing traces to your own assumption about what they probably want.

## 3. Ask for targets and references

Ask the user for 1 to 3 targets. A target is a number to reach and the date to reach it by. For a client project, use a number that the client counts, such as leads or bookings. Write the targets in "Success".

Copy into "References" each line of the client's `EXAMPLES.md` that this project uses. Then ask the user for example sites. For each example, ask what to take from it and what not to take. Write one line for each example in "References".

**Done when:** "Success" has 1 to 3 targets, each with a date, and each line in "References" has a link and what to take from it.

## 4. Force the exclusions

Write the out-of-scope section last and make it hurt. It should name things a reasonable person would expect this project to do.

Then test the whole document: hand it to someone who has never heard the idea, and ask what they would build. If they could build something the user did not intend, the brief is still too loose — find the sentence that allowed it and tighten that one.

**Done when:** the out-of-scope section names at least one thing the user actually wanted, deferred with a reason. An exclusion list of things nobody wanted anyway excludes nothing.

## 5. Place it

Write the brief to `1-idea/PROJECT-DESCRIPTION.md`. Save it as "Saving" in [`WORKSPACE.md`](../idea-grill/WORKSPACE.md) says.

**Done when:** the file is at `1-idea/PROJECT-DESCRIPTION.md`, saved as `WORKSPACE.md` says.
