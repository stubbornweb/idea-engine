# product

Skills that take a client's pain to a written project definition.

```
client-intake   →  INTAKE.md  →  PROPOSAL.md  →  PAINS-INDEX.md
                                                   ↓ pain at 3 clients
                                                 SIGNALS.md
idea-grill      →  IDEA-DECISION.md
idea-research   →  RESEARCH-QUESTIONS.md  →  research/
setup-meta-repo →  the meta repo, PROJECT.md
project-brief   →  PROJECT-DESCRIPTION.md
```

| Skill | Does | Leans on |
|---|---|---|
| [`client-intake`](client-intake) | Client post → questions → intake, proposal, logged pain | — |
| [`idea-grill`](idea-grill) | Raw idea → written verdict | `mattpocock-skills:grilling` |
| [`idea-research`](idea-research) | Open assumptions → ranked questions, dispatched | `mattpocock-skills:research` |
| [`setup-meta-repo`](setup-meta-repo) | Slug → meta repo, with `PROJECT.md` after PROCEED or for a joining product | — |
| [`project-brief`](project-brief) | Project repo → project definition | — |

`client-intake` sits upstream: it gathers evidence and judges nothing. `idea-grill` judges.

`idea-grill` holds the files the others read across to: [`WORKSPACE.md`](idea-grill/WORKSPACE.md) (where artifacts live), [`FILTERS.md`](idea-grill/FILTERS.md) (the four checks every idea clears first) and [`VERDICTS.md`](idea-grill/VERDICTS.md) (PROCEED / REFINE / PARK / REJECT). `client-intake` owns [`ONE-SCREEN-FORMAT.md`](client-intake/ONE-SCREEN-FORMAT.md), the shape of every file a human reads, and [`SIGNALS-FORMAT.md`](client-intake/SIGNALS-FORMAT.md). Everything else each skill owns outright.

Rule files (`MOM-TEST.md` and the like) are books distilled into pass/fail checks, kept beside the step that uses them.
