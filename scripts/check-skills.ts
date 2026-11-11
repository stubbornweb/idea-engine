import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";

type SkillFolder = { category: string; name: string; path: string };

const LABEL = /^\s*_Worth testing\. Source: https?:\/\/\S+_$/;
const LINK = /\[[^\]]*\]\(([^)\s]+)\)/g;
const NUMBERED_STEP = /^## \d+\./;

export function checkSkills(root: string): string[] {
  const skills = skillFolders(root);
  return [
    ...checkPluginJson(root, skills),
    ...checkReadmeRows(root, skills),
    ...skills.flatMap((skill) => checkSkillFile(root, skill)),
    ...markdownFiles(root, "skills").flatMap((file) => checkMarkdown(root, file)),
  ];
}

function skillFolders(root: string): SkillFolder[] {
  return subfolders(join(root, "skills")).flatMap((category) =>
    subfolders(join(root, "skills", category))
      .filter((name) => existsSync(join(root, "skills", category, name, "SKILL.md")))
      .map((name) => ({ category, name, path: `./skills/${category}/${name}` })),
  );
}

function checkPluginJson(root: string, skills: SkillFolder[]): string[] {
  const file = ".claude-plugin/plugin.json";
  const listed: string[] = JSON.parse(readFileSync(join(root, file), "utf8")).skills ?? [];
  const found = new Set(skills.map((skill) => skill.path));
  return [
    ...skills
      .filter((skill) => !listed.includes(skill.path))
      .map((skill) => `${file}: does not list ${skill.path}`),
    ...listed
      .filter((path) => !found.has(path))
      .map((path) => `${file}: lists ${path}, which has no SKILL.md`),
  ];
}

function checkReadmeRows(root: string, skills: SkillFolder[]): string[] {
  return skills.flatMap((skill) => {
    const file = `skills/${skill.category}/README.md`;
    const readme = existsSync(join(root, file)) ? readFileSync(join(root, file), "utf8") : "";
    return readme.includes(`[\`${skill.name}\`](${skill.name})`)
      ? []
      : [`${file}: has no table row for ${skill.name}`];
  });
}

function checkSkillFile(root: string, skill: SkillFolder): string[] {
  const file = `skills/${skill.category}/${skill.name}/SKILL.md`;
  const lines = readFileSync(join(root, file), "utf8").split("\n");
  const errors: string[] = [];

  const name = lines
    .find((line) => line.startsWith("name: "))
    ?.slice("name: ".length)
    .trim();
  if (name !== skill.name)
    errors.push(`${file}: name "${name}" is not the folder name "${skill.name}"`);

  let step: string | undefined;
  let done = false;
  for (const line of [...outsideCodeBlocks(lines), "## end"]) {
    if (!line.startsWith("## ")) {
      done ||= line.includes("**Done when:**");
      continue;
    }
    if (step && !done) errors.push(`${file}: "${step}" has no **Done when:** line`);
    step = NUMBERED_STEP.test(line) ? line : undefined;
    done = false;
  }
  return errors;
}

function checkMarkdown(root: string, file: string): string[] {
  const lines = outsideCodeBlocks(readFileSync(join(root, file), "utf8").split("\n"));
  const errors: string[] = [];
  for (const line of lines) {
    if (line.includes("Worth testing") && !LABEL.test(line)) {
      errors.push(`${file}: label line must be "_Worth testing. Source: <link>_"`);
    }
    for (const [, target] of line.replace(/`[^`]*`/g, "").matchAll(LINK)) {
      if (/^(https?:|mailto:|#|<)/.test(target)) continue;
      const path = target.split("#")[0];
      if (!existsSync(join(root, dirname(file), path))) {
        errors.push(`${file}: link "${target}" points to a missing file`);
      }
    }
  }
  return errors;
}

function outsideCodeBlocks(lines: string[]): string[] {
  const kept: string[] = [];
  let fence: string | undefined;
  for (const line of lines) {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence === undefined && marker) fence = marker;
    else if (fence !== undefined && marker?.[0] === fence[0] && marker.length >= fence.length)
      fence = undefined;
    else if (fence === undefined) kept.push(line);
  }
  return kept;
}

function markdownFiles(root: string, folder: string): string[] {
  return readdirSync(join(root, folder)).flatMap((entry) => {
    const path = join(folder, entry);
    if (statSync(join(root, path)).isDirectory()) return markdownFiles(root, path);
    return entry.endsWith(".md") ? [relative(".", path)] : [];
  });
}

function subfolders(path: string): string[] {
  if (!existsSync(path)) return [];
  return readdirSync(path).filter((entry) => statSync(join(path, entry)).isDirectory());
}

if (import.meta.main) {
  const errors = checkSkills(process.cwd());
  for (const error of errors) console.error(error);
  if (errors.length > 0) process.exit(1);
  console.log("check-skills: all skills pass");
}
