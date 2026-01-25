import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CTA from './CTA';
import '@testing-library/jest-dom';

describe('CTA Component', () => {
  it('renders the Download Resume button/link', () => {
    render(<CTA />);
    const resumeLink = screen.getByRole('link', { name: /download resume/i });
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink).toHaveAttribute('href', '#'); // Placeholder for MVP
  });

  it('renders the Contact Me button/link', () => {
    render(<CTA />);
    const contactLink = screen.getByRole('link', { name: /contact me/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', 'mailto:sergio.grivetto@gmail.com');
  });
});
