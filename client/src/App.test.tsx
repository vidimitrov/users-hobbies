import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders User Hobbies header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/User Hobbies/i);
  expect(headerElement).toBeInTheDocument();
});
