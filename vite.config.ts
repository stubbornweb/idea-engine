import { defineConfig } from "vite-plus";

const ignorePatterns = ["skills/**", "**/*.md"];

export default defineConfig({
  fmt: { ignorePatterns },
  lint: {
    ignorePatterns,
    options: { typeAware: true, typeCheck: true },
  },
});
