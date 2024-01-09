import { render, screen } from '@testing-library/react';
import App from './App';

test('renders React App', () => {
  render(<App />);
  const linkElement = screen.getByTitle(/React App/i);
  expect(linkElement).toBeInTheDocument();
});
