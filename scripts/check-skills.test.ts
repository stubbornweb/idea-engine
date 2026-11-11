import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, test } from "vite-plus/test";
import { checkSkills } from "./check-skills.ts";

const SKILL = `---
name: demo-skill
description: Demo.
---

# Demo

See [the format](FORMAT.md).

_Worth testing. Source: https://example.com/source.md_

## 1. Do the thing

**Done when:** the thing is done.

## Where it goes next

- Stop.
`;

const README = `# product

| Skill | Does |
|---|---|
| [\`demo-skill\`](demo-skill) | Demo |
`;

const FORMAT = `# Format

\`\`\`markdown
[an example link](not-a-real-file.md)
\`\`\`
`;

const BASE: Record<string, string> = {
  ".claude-plugin/plugin.json": JSON.stringify({ skills: ["./skills/product/demo-skill"] }),
  "skills/product/README.md": README,
  "skills/product/demo-skill/SKILL.md": SKILL,
  "skills/product/demo-skill/FORMAT.md": FORMAT,
};

function errorsFor(edit: Record<string, string | null> = {}): string[] {
  const root = mkdtempSync(join(tmpdir(), "check-skills-"));
  try {
    for (const [path, text] of Object.entries({ ...BASE, ...edit })) {
      if (text === null) continue;
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), text);
    }
    return checkSkills(root);
  } finally {
    rmSync(root, { recursive: true });
  }
}

test("a valid plugin has no errors, and links inside code blocks are examples", () => {
  expect(errorsFor()).toEqual([]);
});

test("a numbered step without a Done-when line fails", () => {
  const errors = errorsFor({
    "skills/product/demo-skill/SKILL.md": SKILL.replace("**Done when:** the thing is done.\n", ""),
  });
  expect(errors).toEqual([
    'skills/product/demo-skill/SKILL.md: "## 1. Do the thing" has no **Done when:** line',
  ]);
});

test("a label line in the wrong form fails", () => {
  const errors = errorsFor({
    "skills/product/demo-skill/SKILL.md": SKILL.replace(
      "_Worth testing. Source: https://example.com/source.md_",
      "Worth testing, see the source",
    ),
  });
  expect(errors).toEqual([
    'skills/product/demo-skill/SKILL.md: label line must be "_Worth testing. Source: <link>_"',
  ]);
});

test("a relative link to a missing file fails", () => {
  const errors = errorsFor({ "skills/product/demo-skill/FORMAT.md": null });
  expect(errors).toEqual([
    'skills/product/demo-skill/SKILL.md: link "FORMAT.md" points to a missing file',
  ]);
});

test("a skill folder missing from plugin.json fails", () => {
  const errors = errorsFor({ ".claude-plugin/plugin.json": JSON.stringify({ skills: [] }) });
  expect(errors).toEqual([".claude-plugin/plugin.json: does not list ./skills/product/demo-skill"]);
});

test("a plugin.json path with no skill folder fails", () => {
  const errors = errorsFor({
    ".claude-plugin/plugin.json": JSON.stringify({
      skills: ["./skills/product/demo-skill", "./skills/product/gone"],
    }),
  });
  expect(errors).toEqual([
    ".claude-plugin/plugin.json: lists ./skills/product/gone, which has no SKILL.md",
  ]);
});

test("a skill missing from the category README table fails", () => {
  const errors = errorsFor({ "skills/product/README.md": "# product\n" });
  expect(errors).toEqual(["skills/product/README.md: has no table row for demo-skill"]);
});

test("a frontmatter name that differs from the folder name fails", () => {
  const errors = errorsFor({
    "skills/product/demo-skill/SKILL.md": SKILL.replace("name: demo-skill", "name: other-name"),
  });
  expect(errors).toEqual([
    'skills/product/demo-skill/SKILL.md: name "other-name" is not the folder name "demo-skill"',
  ]);
});

test("a template slot such as (<link>) is not a broken link", () => {
  const errors = errorsFor({
    "skills/product/demo-skill/FORMAT.md": "# Format\n\n- [<name>](<link>): <what to take>\n",
  });
  expect(errors).toEqual([]);
});
