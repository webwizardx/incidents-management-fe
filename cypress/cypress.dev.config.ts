import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '128076ed-9868-4e98-9cef-98dd8b705d75',
  env: {
    user: {
      email: 'jonathanalvarado1407@gmail.com',
      password: 'password',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    screenshotOnRunFailure: false,
  },
});
