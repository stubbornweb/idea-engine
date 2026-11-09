# Idea Engine — agent rules

This repository is the Idea Engine plugin of the studio. It holds Markdown skills only, no code.

## Shared rules

1. Work on a branch and open a pull request. Never push to `main`.
2. Write a failing test first for any code with logic.
3. Run `claude plugin validate .` before you open a pull request.
4. Write all text in plain English (Simplified Technical English style, CEFR B1).

Skills have no unit tests.

## Repo rules

- Read `README.md` before you add, move or rename a skill. It holds the layout and the naming rules.
- The skills write their output to the meta repos and to `clients-meta`, as `skills/product/idea-grill/WORKSPACE.md` says. This repo holds only the skills.
- `.claude-plugin/plugin.json` has no `version` field, so every merge to `main` is a release. The `stubbornweb/solo-product-studio` marketplace lists this plugin.
