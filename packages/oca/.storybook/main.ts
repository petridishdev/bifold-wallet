import type { StorybookConfig } from '@storybook/react-webpack5'

import NodePployfillPlugin from 'node-polyfill-webpack-plugin'

import { join, dirname, resolve } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-react-native-web'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@oca': resolve(__dirname, '..', 'src'),
      '@ui': resolve(__dirname, '..', 'src/ui'),
      '@utils': resolve(__dirname, '..', 'src/utils'),
    }
    config.resolve?.modules?.push(resolve(__dirname, '..', 'node_modules'))
    config.plugins?.push(new NodePployfillPlugin())
    return config
  },
}
export default config
