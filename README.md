# idea-engine

The Idea Engine of the studio: agent skills, shipped as a Claude Code plugin.

## Layout

```
.claude-plugin/
  plugin.json        every skill path, listed explicitly
scripts/
  check-skills.ts    checks the skills: links, Done-when lines, label lines, plugin.json and README rows
skills/
  <category>/
    README.md        what the category is for
    <skill-name>/
      SKILL.md       the skill
      *.md           its own references and formats, flat beside it
```

Each skill is self-contained: the reference material and output formats it owns sit inside its own folder, not in a shared `templates/` or `references/` pile at the root. A skill folder is the unit you read, move, or delete.

When two skills in a category genuinely share a reference, the skill that *creates* the thing owns the file and the others point across at it — one source of truth, no copies.

## Naming

- **Skills:** lowercase kebab-case, domain first — `client-intake`, `idea-grill`, `idea-research`, `project-brief`. The domain word groups a category into a readable sequence, and the frontmatter `description` (not the name) is what actually triggers a skill. No `product-` prefix: the category folder already says that.
- **Sibling files:** `UPPERCASE-KEBAB.md`. `*-FORMAT.md` for an output shape the skill fills in; a plain name for reference material it reads.

## Categories

| Category | For |
|---|---|
| [`product`](skills/product) | Client pain → idea → verdict → project definition |

## Where artifacts go

Not here. Skills are reusable behaviour; idea and project documents are project memory with a different lifecycle. See [`WORKSPACE.md`](skills/product/idea-grill/WORKSPACE.md).

## Deliberately absent

- **`registry.yaml`** — [`web-developmet-registry`](https://github.com/YevheniiVolosiuk/web-developmet-registry) holds the catalog. A second copy here would be a stale duplicate.
- **`workflows/*.yaml`** — nothing executes YAML steps. Sequencing lives in each skill's closing section, which an agent actually reads.
- **`category:` frontmatter** — Claude Code reads `name`, `description`, `allowed-tools`. The folder carries the category.

## Install

As a plugin, from the studio marketplace:

```
/plugin marketplace add stubbornweb/solo-product-studio
/plugin install idea-engine@studio
```

Or symlink a single skill while tuning it:

```sh
ln -s "$PWD/skills/product/idea-grill" ~/.claude/skills/idea-grill
```

The symlink is the better loop while a skill is still moving — edit, run it on a real idea, edit again.

## Adding a skill

1. It earns a slot by failing in practice first. Write it after watching the gap, not before.
2. One folder under a category, one `SKILL.md`, folder name matching frontmatter `name`.
3. Its references and formats go beside it, not in a shared root folder.
4. Add the path to `.claude-plugin/plugin.json` and the row to the category `README.md`.
