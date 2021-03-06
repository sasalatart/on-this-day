/// <reference types="cypress" />

export default {};

function assertIsDateSelection(): void {
  cy.get('#date-select-title').should(
    'contain.text',
    'Search For Historical Episodes',
  );
}

describe('Routing', () => {
  describe('/', () => {
    it('renders the date selection screen', () => {
      cy.visit('/');
      assertIsDateSelection();
    });
  });

  describe('/year-date?day=<day>&month=<month>', () => {
    it('renders the episodes timeline', () => {
      cy.visit('/year-date?day=15&month=1');
      cy.get('#timeline-subtitle').should('contain.text', 'January 15');
    });

    context('when clicking on the App Bar title', () => {
      it('redirects to the date selection screen', () => {
        cy.get('#brand').click();
        assertIsDateSelection();
      });
    });
  });

  describe('/inexistent-route', () => {
    it('falls back to the date selection screen', () => {
      cy.visit('/inexistent-route');
      assertIsDateSelection();
    });
  });
});
