/**
 * Tells whether the commits since the last release tag would produce a new version,
 * using the same commit-analyzer rules as semantic-release (see release.config.js).
 *
 * Prints "true" or "false" on stdout. Used by the CircleCI setup workflow so the
 * release workflow (and its approval) only appears when there is something to release:
 * docs/chore/test commits and the "chore(release): x.y.z [skip ci]" commit are ignored.
 */
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { analyzeCommits } from '@semantic-release/commit-analyzer';

const require = createRequire(import.meta.url);
const config = require('../release.config.js');

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

const branch = process.argv[2] || git('rev-parse', '--abbrev-ref', 'HEAD');
const branchConfig = config.branches
  .map((b) => (typeof b === 'string' ? { name: b } : b))
  .find((b) => b.name === branch);

if (!branchConfig) {
  console.error(`Branch "${branch}" is not a release branch`);
  console.log('false');
  process.exit(0);
}

// On a stable branch, pre-release tags must not be used as the last release
const describeArgs = ['describe', '--tags', '--abbrev=0', '--match', 'v[0-9]*'];
if (!branchConfig.prerelease) {
  describeArgs.push('--exclude', 'v*-*');
}

let lastTag = null;
try {
  lastTag = git(...describeArgs);
} catch {
  // No release yet: every commit is analysed
}

const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
const raw = git('log', range, '--format=%H%x1f%B%x1e');
const commits = raw
  .split('\x1e')
  .map((entry) => entry.trim())
  .filter(Boolean)
  .map((entry) => {
    const [hash, message] = entry.split('\x1f');
    return { hash, message: message.trim() };
  });

const [, analyzerConfig = {}] = config.plugins
  .map((p) => (Array.isArray(p) ? p : [p]))
  .find(([name]) => name === '@semantic-release/commit-analyzer') || [];

const silent = { log: () => {}, error: () => {}, warn: () => {}, success: () => {} };
const releaseType = await analyzeCommits(analyzerConfig, { commits, logger: silent, cwd: process.cwd() });

console.error(`Branch: ${branch} | last tag: ${lastTag ?? 'none'} | ${commits.length} commit(s) | release type: ${releaseType ?? 'none'}`);
console.log(releaseType ? 'true' : 'false');
