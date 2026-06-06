---
name: git-push
description: Stage all changes, commit them, and push the current branch safely
---

# Git Push

Use this prompt when the user wants the current repository changes staged, committed, and pushed to the remote branch.

## Goal

Stage every local change, create a commit when there is anything to commit, and push the current branch. Move quickly, but do not hide failures or force through risky Git states.

## Required Workflow

1. Confirm the current directory is inside a Git repository:
   - Run `git rev-parse --show-toplevel`.
   - If it fails, stop and tell the user this directory is not a Git repository.

2. Inspect the current state:
   - Run `git status --short`.
   - Run `git branch --show-current`.
   - Run `git remote -v`.
   - If the branch name is empty, stop and tell the user the repo is in detached HEAD state.
   - If there is no remote, stop and ask the user which remote to add or use.

3. Stage all changes:
   - Run `git add -A`.
   - Run `git status --short` again.
   - If there are still no staged changes, skip the commit step and continue to the push step only if the user explicitly asked to push an existing commit. Otherwise, report that there is nothing to commit or push.

4. Review staged changes enough to write a reasonable commit message:
   - Run `git diff --cached --stat`.
   - If helpful, inspect `git diff --cached` or focused file diffs.
   - Do not include secrets, credentials, generated noise, or unrelated large artifacts knowingly. If suspicious files are staged, stop and ask the user before committing.

5. Commit staged changes:
   - Use a concise commit message based on the staged changes.
   - Prefer conventional commit style when it fits, such as `feat: ...`, `fix: ...`, `docs: ...`, or `chore: ...`.
   - Run `git commit -m "<message>"`.
   - If the commit fails because hooks or tests fail, stop, summarize the failing output, and do not bypass hooks unless the user explicitly asks.

6. Push the current branch:
   - First check upstream with `git rev-parse --abbrev-ref --symbolic-full-name @{u}`.
   - If an upstream exists, run `git push`.
   - If no upstream exists, run `git push -u origin <current-branch>` when `origin` exists.
   - If `origin` does not exist but exactly one remote exists, use that remote.
   - If multiple remotes exist and no upstream exists, stop and ask the user which remote to use.

## Failure Handling

- **Push rejected because remote has new commits:** stop and report that the remote contains work not present locally. Do not run `git pull`, rebase, merge, or force push unless the user asks.
- **Merge or rebase conflict already present:** stop, show the conflicted files from `git status --short`, and ask the user how they want to resolve them.
- **Authentication or permission failure:** stop and report the remote and branch that failed. Do not retry with different credentials unless the user provides them.
- **Protected branch rejection:** stop and report the rejection. Suggest creating a branch or pull request only if appropriate for the repo.
- **Nothing to commit:** do not create an empty commit unless the user explicitly requested one.
- **Untracked files:** `git add -A` stages them. If any untracked file looks like a secret, build artifact, dependency folder, or local environment file, stop before committing.
- **Large files:** if staged output suggests unusually large or binary files, pause and verify they belong in Git before committing.

## Response Format

Keep the user informed with:

- What was staged.
- The commit hash and message, if a commit was created.
- The remote and branch pushed.
- Any failure, with the exact next action needed.

Do not claim the push succeeded unless the `git push` command completed successfully.
