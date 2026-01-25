import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Bio from './Bio';
import '@testing-library/jest-dom'; 

describe('Bio Component', () => {
  it('renders the name and title correctly', () => {
    render(<Bio />);
    expect(screen.getByText('Sergio Grivetto')).toBeInTheDocument();
    expect(screen.getByText('Peaceful Thoughts & Digital Innovation')).toBeInTheDocument();
  });

  it('renders the bio description', () => {
    render(<Bio />);
    expect(screen.getByText(/exploring the intersection/i)).toBeInTheDocument();
  });
});
