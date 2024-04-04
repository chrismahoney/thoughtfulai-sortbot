import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run sortbot:serve',
        production: 'nx run sortbot:preview',
      },
      ciWebServerCommand: 'nx run sortbot:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
