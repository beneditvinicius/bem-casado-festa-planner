
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  // Basic test to ensure the app renders without errors
  expect(document.body).toBeTruthy();
});
