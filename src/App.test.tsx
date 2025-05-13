
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Smoke: App carrega sem quebrar', () => {
  const { container } = render(<App />);
  expect(container).not.toBeEmptyDOMElement();
});
