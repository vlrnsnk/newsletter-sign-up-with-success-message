import './scss/main.scss';
import { initNewsletterSignup } from './newsletter-signup.js';

const destroyNewsletterSignup = initNewsletterSignup();

// Cleanup on page hide to prevent memory leaks and remove event listeners
window.addEventListener('pagehide', () => {
  destroyNewsletterSignup();
});
