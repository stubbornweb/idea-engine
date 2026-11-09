# Workspace

Where artifacts live. Skills are reusable behaviour; these files are project memory. They do not live in this repo.

## Location

Every skill in this category uses two fixed paths and no environment variables. The layout follows ADR 0003 in `stubbornweb/solo-product-studio`.

- `~/www/<slug>-meta/`, a clone of the private repo `stubbornweb/<slug>-meta`. It is the meta repo of one idea. `setup-meta-repo` makes it.
- `~/www/clients-meta/`, a clone of the private repo `stubbornweb/clients-meta`. It holds the client folders. `client-intake` makes it.

```
~/www/<slug>-meta/
└── 1-idea/
    ├── IDEA-DECISION.md        # idea-grill
    ├── research/
    │   ├── RESEARCH-QUESTIONS.md  # idea-research
    │   └── <question-slug>.md  # the research skill writes findings here
    └── PROJECT-DESCRIPTION.md  # project-brief

~/www/clients-meta/
├── PAINS-INDEX.md              # client-intake: pains, their clients, the 3-client signals
└── <client-slug>/              # client-intake
    ├── INTAKE.md
    ├── PROPOSAL.md
    ├── EXAMPLES.md             # example sites the client sent
    └── NOTES.md                # raw evidence, agent notes
```

Files appear in this order as an idea moves through the chain. A missing file means that stage has not run. `setup-meta-repo` writes the files at the root of a meta repo, such as `PROJECT.md`.

## Saving

Each skill that writes into a meta repo or into `clients-meta` saves its files through a pull request. The branch is the skill name. In `clients-meta` it is `client-intake/<client-slug>`.

1. **Before you write:** if an open pull request from the branch exists, switch to the branch and pull it. If not, switch to the default branch, pull it, and run `git switch -C <branch>`. If `git status` shows changes, stop and tell the user.
2. **When the skill stops or is done:** commit the files, run `git push --force -u origin <branch>`, and open a pull request to the default branch if none is open. Ask the user to merge it.

## File names

Does the skill know the file's name before it runs?

- **Yes → UPPERCASE:** `INTAKE.md`, `PAINS-INDEX.md`, `IDEA-DECISION.md`
- **No, it is named after its content → lowercase:** `research/<question-slug>.md`, client folders

## Slugs

A slug uses only `a-z`, `0-9` and single dashes. It starts and ends with a letter or a digit, and it has 40 characters or fewer. An idea slug must not be the name of a studio repo (`hub`, `idea-engine`, `design-engine`, `prototype-engine`), must not be `clients`, and must not end in `-meta`. Client slugs are a separate list, so a client slug can be the same as an idea slug.

Reject a slug that breaks this rule, and show the rule. Never change a slug yourself: ask for a new one. A slug never changes after its meta repo or client folder is made.

- **Idea:** named for the thing it does, not the technology. `class-booking-reminders`, not `ai-tool` or `nih-v2`.
- **Client:** named for the company. `fitwerk`, not `client-3` or `upwork-job-41`.

## History

Never rewrite a file an earlier stage produced. Add a dated section instead.

`IDEA-DECISION.md` has one exception. Its `**Verdict:**` and `**Date:**` lines show the current verdict and the day it was given, and a revision round of `idea-grill` edits these two lines. The rest of the file only grows, so it keeps the history of how the verdict changed.
