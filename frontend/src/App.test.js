// frontend/src/App.test.js

import { render, screen } from '@testing-library/react';
import App from './App';

// We are renaming the test to be more descriptive
test('renders the main dashboard heading', () => {
  render(<App />);
  
  // The test now looks for the text "Dashboard" which is in our Header component
  const headingElement = screen.getByText(/Dashboard/i);
  
  expect(headingElement).toBeInTheDocument();
});