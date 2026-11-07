# Workspace

Where artifacts live. Skills are reusable behaviour; these files are project memory. They do not live in this repo.

## Location

Every skill in this category uses two fixed paths and no environment variables:

- `~/www/idea-workspace/`, a clone of the private GitHub repo `stubbornweb/idea-workspace`. It holds the idea folders and the client folders.
- `~/www/prototypes/<slug>/`, for quick experiments. It has no git.

```
~/www/idea-workspace/
├── clients/
│   ├── PAINS-INDEX.md          # normalized pain → clients who have it
│   └── <client-slug>/          # client-intake
│       ├── INTAKE.md
│       ├── PROPOSAL.md
│       ├── EXAMPLES.md         # example sites the client sent
│       └── NOTES.md            # raw evidence, agent notes
└── ideas/
    └── <slug>/
        ├── SIGNALS.md          # client-intake
        ├── IDEA-DECISION.md    # idea-grill
        ├── RESEARCH-QUESTIONS.md  # idea-research
        └── research/           # the research skill writes findings here
            └── <question-slug>.md
```

Files appear in this order as an idea moves through the chain. A missing file means that stage has not run.

When an idea gets PROCEED, `setup-meta-repo` writes `PROJECT.md` in its meta repo `~/www/<slug>-meta/`. Then `project-brief` writes `1-idea/PROJECT-DESCRIPTION.md` there.

## File names

Does the skill know the file's name before it runs?

- **Yes → UPPERCASE:** `INTAKE.md`, `SIGNALS.md`, `IDEA-DECISION.md`
- **No, it is named after its content → lowercase:** `research/<question-slug>.md`, client and idea folders

## Slugs

A slug uses only `a-z`, `0-9` and single dashes. It starts and ends with a letter or a digit, and it has 40 characters or fewer. An idea slug must not be the name of a studio repo (`hub`, `idea-engine`, `design-engine`, `prototype-engine`), must not be `clients`, and must not end in `-meta`. Client slugs are a separate list, so a client slug can be the same as an idea slug.

Reject a slug that breaks this rule, and show the rule. Never change a slug yourself: ask for a new one. A slug never changes after its folder is made.

- **Idea:** named for the thing it does, not the technology. `class-booking-reminders`, not `ai-tool` or `nih-v2`.
- **Client:** named for the company. `fitwerk`, not `client-3` or `upwork-job-41`.

## History

Never rewrite a file an earlier stage produced. Append a dated section instead — the history of how a verdict changed is the point of keeping the record.
