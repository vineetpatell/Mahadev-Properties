# Development Rules

- Inspect the existing project before editing files.
- Do not redesign working pages unless explicitly requested.
- Make small, focused changes instead of rewriting entire files.
- Preserve existing dependencies and architecture unless a change is justified.
- For React, Next.js, Vite, GSAP and Three.js, check the installed versions and current documentation.
- After changes, run the relevant typecheck, lint and production build.
- For UI changes, test desktop and mobile layouts in a real browser.
- For deployment bugs, reproduce with a production build and inspect console errors.
- Never claim a test passed unless it was actually run.
- Never expose API keys, passwords or .env secrets.
- Ask before deleting files, changing infrastructure or running destructive commands.
- Report changed files, commands run, test results and remaining issues.
