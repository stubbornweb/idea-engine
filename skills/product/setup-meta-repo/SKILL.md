---
name: setup-meta-repo
description: Make or repair the meta repo stubbornweb/<slug>-meta - add the missing files, make PROJECT.md match the verdict or write it for an existing product that joins, and archive the repo after REJECT. Use at the start of idea-grill and after each verdict, when an existing product joins the studio, or before a quick experiment.
---

# Setup meta repo

Checks one meta repo, `stubbornweb/<slug>-meta`. It adds what is missing, and it removes a `PROJECT.md` that the verdict does not allow. A second run on the same slug changes nothing. The steps follow "Setting up a meta repo" in ADR 0003 of `stubbornweb/solo-product-studio`.

Ask every question through `AskUserQuestion`. Keep a list of each change you make, for step 7.

## 1. Check the slug

Agree the slug with the user. Check it against the slug rule in [`WORKSPACE.md`](../idea-grill/WORKSPACE.md). If the slug breaks the rule, reject it, show the rule and ask for a new slug. Never change the slug yourself.

**Done when:** the slug follows the rule.

## 2. Get the repo

Run `gh repo view stubbornweb/<slug>-meta --json isArchived,visibility`.

- **The repo does not exist:** tell the user that you will make the private repo `stubbornweb/<slug>-meta`, and wait for a "yes". Then run `gh repo create stubbornweb/<slug>-meta --private --add-readme`. The first README commit gives the repo a `main` branch.
- **The repo is archived:** a REJECT verdict archived it. Say so and stop. Change nothing.
- **The repo is public:** stop and tell the user: a meta repo is private.

If the repo has an open pull request from the branch `setup-meta-repo`, stop and ask the user to merge or close it first.

The local clone is `~/www/<slug>-meta/`. If that folder does not exist, run `gh repo clone stubbornweb/<slug>-meta ~/www/<slug>-meta`. If it exists but is not a clone of `stubbornweb/<slug>-meta`, or `git status` shows changes, stop and tell the user. Then switch to the default branch and pull it.

**Done when:** `~/www/<slug>-meta/` is a clean clone on the latest default branch, and the repo is private and not archived.

## 3. Read the verdict

Read the `**Verdict:**` line of `1-idea/IDEA-DECISION.md`. This file is the decision record.

- **REJECT:** go to step 6. The repo becomes read-only, so it needs no repair.
- **Any other verdict, or no decision record:** go to step 4.

**Done when:** you know the verdict, or that there is no decision record.

## 4. Add the base files

Fill [`META-REPO-FILES-FORMAT.md`](META-REPO-FILES-FORMAT.md) for each of `README.md`, `AGENTS.md`, `CLAUDE.md` and `.gitignore` that is missing. A `README.md` that has only the title line `# <slug>-meta` counts as missing: `gh repo create` wrote it. Keep every other file that already exists as it is.

**Done when:** the repo root has all 4 files.

## 5. Match PROJECT.md to the verdict

- **The verdict is REFINE or PARK:** if `PROJECT.md` has `**Stage:** idea`, remove it with `git rm PROJECT.md`. Then skip the rest of this step.
- **`PROJECT.md` exists:** skip this step.
- **The verdict is PROCEED:** write `PROJECT.md`. The stage is `idea`.
- **There is no decision record:** if the caller said that this is a new idea or a quick experiment, skip this step. Otherwise ask the user: "Is `<slug>` an existing product that joins the studio?" If the answer is no, skip this step. If it is yes, ask the user:
  - **The stage the project enters at:** `idea`, `design`, `prototype`, `build`, `live` or `closed`.
  - **The code repo:** its full `<owner>/<repo>` name, or none. Check that `gh repo view <owner>/<repo>` finds it.

When you write `PROJECT.md`, also ask the user:

- **The client:** the client slug, or none. A client slug follows the same slug rule. If `~/www/clients-meta/<client-slug>/` does not exist, stop and tell the user to run `client-intake` first.
- **The project name:** a short name for the title. Offer the title of `IDEA-DECISION.md` first, if it exists.

Fill `PROJECT.md` from [`META-REPO-FILES-FORMAT.md`](META-REPO-FILES-FORMAT.md). For an existing product that joins at a stage after `idea`, add the entry note to `README.md`.

**Done when:** `PROJECT.md` exists with the stage, client and code repo the user gave, or it was removed, or this step was skipped for one of the reasons above.

## 6. Archive after REJECT

Only for the REJECT verdict. Tell the user that you will archive `stubbornweb/<slug>-meta`, and that the repo then becomes read-only. Wait for a "yes". Then run `gh repo archive stubbornweb/<slug>-meta --yes`.

**Done when:** the repo is archived, or the user said no.

## 7. Report

If step 4 or 5 changed files, save them as "Saving" in [`WORKSPACE.md`](../idea-grill/WORKSPACE.md) says. Step 2 made sure that no open pull request uses the branch `setup-meta-repo`.

Tell the user each change from your list: the repo made, the files added, `PROJECT.md` written or removed, the entry note, the commit or the pull request, or the archive. If the list is empty, say: "Nothing was missing. Nothing changed."

**Done when:** the user knows every change, and every changed file is saved as `WORKSPACE.md` says.

## Where it goes next

- A new idea with no decision record → `idea-grill`
- PROCEED, and no `1-idea/PROJECT-DESCRIPTION.md` → `project-brief`
- A brief and no prototype → the Prototype Engine, run inside `~/www/<slug>-meta/`
