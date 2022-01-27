import { render, screen } from '@testing-library/react';
import App from './App';

describe('Test App Component', () => {
  it('Should App component render correctly', () => {
    render(<App />);
    expect(screen.getByText(/app/i)).toBeInTheDocument();
  });
});
