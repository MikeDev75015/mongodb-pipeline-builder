/**
 * semantic-release configuration.
 *
 * - main: stable releases published on the npm "latest" dist-tag
 * - beta: pre-releases (x.y.z-beta.n) published on the npm "beta" dist-tag
 *
 * The version is computed from the conventional commits since the last tag
 * (feat → minor, fix/perf → patch, BREAKING CHANGE → major, docs/chore/... → no release).
 */
const preset = 'conventionalcommits';

module.exports = {
  branches: [
    'main',
    { name: 'beta', prerelease: true },
  ],
  tagFormat: 'v${version}',
  plugins: [
    ['@semantic-release/commit-analyzer', { preset }],
    ['@semantic-release/release-notes-generator', { preset }],
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
    [
      '@semantic-release/exec',
      {
        // Bump the root package.json / package-lock.json, then copy the files shipped with the package into dist
        prepareCmd: 'npm version ${nextRelease.version} --no-git-tag-version --allow-same-version'
          + ' && cp -f Readme.md CHANGELOG.md LICENSE package.json dist/',
      },
    ],
    ['@semantic-release/npm', { pkgRoot: 'dist' }],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
        // [skip ci] prevents CircleCI from running a pipeline for the version commit
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};
