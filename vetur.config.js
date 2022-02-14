module.exports = {
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': true

  },
  projects: [
    {
      root: './packages/configure',
      package: './package.json',
      tsconfig: './tsconfig.json'
    },
    {
      root: './packages/common',
      package: './package.json',
      tsconfig: './tsconfig.json'
    },
    {
      root: './packages/designer',
      package: './package.json',
      tsconfig: './tsconfig.json'
    }
  ]
}
