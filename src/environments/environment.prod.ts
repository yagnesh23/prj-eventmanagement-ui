export const environment = {
  production: true,
  hmr: false,
  environmentName: 'production',
  configJsonPath: 'assets/config/config.prod.json',
  version: `${require('../../package.json').version}-${new Date().getTime}`,
};