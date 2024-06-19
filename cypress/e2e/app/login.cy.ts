describe('Unauthenticated', () => {
  it('should be redirected to /login page', () => {
    cy.visit('/');
    cy.url().should('contain', '/login');
  });

  it('should successfully login', () => {
    cy.login();
  });
});

describe('Authenticated', () => {
  it('should be redirected to /dashboard page', () => {
    cy.login();
    cy.visit('/login');
    cy.url().should('contain', '/dashboard');
  });

  it('should successfully logout', () => {
    cy.login();
    cy.visit('/');
    cy.get('[data-cy="avatar-menu"]').click();
    cy.get('[data-cy="logout-button"]').click();
    cy.url().should('contain', '/login');
  });
});
