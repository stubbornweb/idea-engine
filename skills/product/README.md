# product

Skills that take a client's pain to a written project definition.

```
client-intake   →  INTAKE.md  →  PROPOSAL.md  →  PAINS-INDEX.md
                                  ↓ diagnosis accepted
client-diagnosis → DIAGNOSIS.md, demos/  →  PROPOSAL.md  →  PAINS-INDEX.md
                                                   ↓ pain at 3 clients
idea-grill      →  IDEA-DECISION.md
idea-research   →  RESEARCH-QUESTIONS.md  →  research/
setup-meta-repo →  the meta repo, PROJECT.md
project-brief   →  PROJECT-DESCRIPTION.md
```

| Skill | Does | Leans on |
|---|---|---|
| [`client-intake`](client-intake) | Client post → questions → intake, proposal, logged pains | — |
| [`client-diagnosis`](client-diagnosis) | Accepted diagnosis → surveys, calls → ranked list, demos, build proposal | `client-intake`, `prototype-engine` |
| [`idea-grill`](idea-grill) | Raw idea → written verdict | `mattpocock-skills:grilling` |
| [`idea-research`](idea-research) | Open assumptions → ranked questions, dispatched | `mattpocock-skills:research` |
| [`setup-meta-repo`](setup-meta-repo) | Slug → meta repo, with `PROJECT.md` after PROCEED or for a joining product | — |
| [`project-brief`](project-brief) | Meta repo with `PROJECT.md` → brief | — |

`client-intake` and `client-diagnosis` sit upstream: they gather evidence and judge no idea. `idea-grill` judges.

`idea-grill` holds the files the others read across to: [`WORKSPACE.md`](idea-grill/WORKSPACE.md) (where artifacts live), [`FILTERS.md`](idea-grill/FILTERS.md) (the four checks every idea clears first) and [`VERDICTS.md`](idea-grill/VERDICTS.md) (PROCEED / REFINE / PARK / REJECT). `client-intake` owns [`ONE-SCREEN-FORMAT.md`](client-intake/ONE-SCREEN-FORMAT.md), the shape of every file a human reads, and [`PAINS-INDEX-FORMAT.md`](client-intake/PAINS-INDEX-FORMAT.md), which `idea-grill` reads. Everything else each skill owns outright.

Rule files (`MOM-TEST.md` and the like) are books distilled into pass/fail checks, kept beside the step that uses them.
