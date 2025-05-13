
import { render, screen } from '@testing-library/react';
import App from './App';

test('App loads without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
