export const environment = {
  production: false,
  hmr: false,
  environmentName: 'staging',
  configJsonPath: 'assets/config/config.json',
  version: `${require('../../package.json').version}-${new Date().getTime}`,
};
