/// <reference types="cypress" />
import upperFirst from 'lodash/upperFirst';
import { EpisodeKind } from '@on-this-day/shared';

function assertChronologicalEpisodes(): void {
  let firstYear: number;

  cy.get('.vertical-timeline-element-content')
    .first()
    .find('p')
    .should('exist');

  cy.get('.vertical-timeline-element-date')
    .first()
    .then(($year) => {
      firstYear = +$year.text();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect($year).not.to.be.NaN;
    });

  cy.scrollTo('bottom');

  cy.get('.vertical-timeline-element-date')
    .last()
    .then(($year) => {
      const lastYear = +$year.text();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect($year).not.to.be.NaN;
      expect(firstYear).not.to.equal(lastYear);
      expect(firstYear).to.be.lessThan(lastYear);
    });
}

function assertRootRedirectionWithAlert(query: string): void {
  cy.visit(`/episodes${query}`);
  cy.location('pathname').should('equal', '/');
  cy.get('#swal2-content').should('contain.text', 'Invalid date');
}

describe('Episodes Timeline', () => {
  context('when URL has invalid query params', () => {
    context('when day is not present in the query param', () => {
      it('redirects to the root dir and alerts', () => {
        assertRootRedirectionWithAlert('?month=1');
      });
    });

    context('when month is not present in the query param', () => {
      it('redirects to the root dir and alerts', () => {
        assertRootRedirectionWithAlert('?day=1');
      });
    });

    context('when month nor day are present as query params', () => {
      it('redirects to the root dir and alerts', () => {
        assertRootRedirectionWithAlert('');
      });
    });

    context('when day and month do not form a valid date', () => {
      it('redirects to the root dir and alerts', () => {
        assertRootRedirectionWithAlert('?day=30&month=2');
      });
    });
  });

  context('When URL has a valid date', () => {
    const day = 15;
    const month = 1;

    before(() => {
      cy.visit(`/episodes?day=${day}&month=${month}`);
    });

    it('specifies the selected date', () => {
      cy.get('#timeline-subtitle').should('have.text', 'January 15');
    });

    describe('description', () => {
      it('has a proper name', () => {
        cy.get('#timeline-description').should('have.text', 'Description');
      });

      it('starts as not expanded, but expands when clicked', () => {
        cy.get('#timeline-description')
          .parent()
          .parent()
          .should('have.attr', 'aria-expanded', 'false')
          .click()
          .should('have.attr', 'aria-expanded', 'true');
      });
    });

    describe('initial tab', () => {
      it('corresponds to events', () => {
        cy.get(`button[role="tab"][data-kind=${EpisodeKind.events}]`).should(
          'have.attr',
          'aria-selected',
          'true',
        );
      });

      it("makes the title's text be 'Events'", () => {
        cy.get('#timeline-title').should(
          'have.text',
          upperFirst(EpisodeKind.events),
        );
      });

      it('displays events chronologically sorted', () => {
        assertChronologicalEpisodes();
      });
    });

    describe('clicking tabs', () => {
      Object.values(EpisodeKind).forEach((episodeKind) => {
        context(`when clicking on ${episodeKind}`, () => {
          it('sets it as selected', () => {
            cy.get(`button[role="tab"][data-kind="${episodeKind}"]`)
              .click()
              .should('have.attr', 'aria-selected', 'true');
          });

          it("changes the title's text", () => {
            cy.get('#timeline-title').should(
              'have.text',
              upperFirst(episodeKind),
            );
          });

          it('displays events chronologically sorted', () => {
            assertChronologicalEpisodes();
          });
        });
      });
    });
  });
});
