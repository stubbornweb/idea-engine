# Meta repo files

The files `setup-meta-repo` writes at the root of a meta repo. The layout and `PROJECT.md` follow ADR 0003, and the agent rules follow ADR 0004, both in `stubbornweb/studio`.

## README.md

```markdown
# <slug>

The meta repo of `<slug>`. It holds the notes and the output of every stage. `1-idea/IDEA-DECISION.md` holds the verdict, and from PROCEED on, `PROJECT.md` names the stage.
```

### Entry note

For an existing product that joins at a stage after `idea`, add this line under the title of `README.md`. The date is today's date:

```markdown
This project joined the studio at the `<stage>` stage on YYYY-MM-DD. The stages before it have no folder here.
```

## AGENTS.md

```markdown
# <slug> meta repo — agent rules

This repository is the meta repo of `<slug>`. It holds the notes and the output of every stage. The product code is in the code repo that `PROJECT.md` names.

## Shared rules

1. Work on a branch and open a pull request. Never push to `main`.
2. Write a failing test first for any code with logic.
3. This repo has no check. Read the full diff before you open a pull request.
4. Write all text in plain English (Simplified Technical English style, CEFR B1).

## Repo rules

- Each stage writes only into its own folder: `1-idea/`, `2-design/`, `3-prototype/`, `4-build/` and `5-live/`. Make a folder only when its stage has output.
- `4-build/` holds notes about the build, such as plans.
- Only the owner sets the stage to `build`, `live` or `closed` in `PROJECT.md`.
```

## CLAUDE.md

```markdown
@AGENTS.md
```

## .gitignore

```
node_modules/
dist/
```

## PROJECT.md

```markdown
# <Project name>

**Format:** 1
**Stage:** <idea | design | prototype | build | live | closed>
**Client:** <client-slug>
**Code:** <owner>/<repo>
```

- Write the `**Client:**` line only for a client project.
- Write the `**Code:**` line only when the project has a code repo.
- Write no slug line. The repo name is `<slug>-meta`.
