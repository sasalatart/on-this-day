/// <reference types="cypress" />
import { MONTHS } from '@on-this-day/shared';

function selectDate(day: string, month: string): void {
  cy.get('#month').click();
  cy.get('ul[role="listbox"]').find(`li[data-value="${month}"]`).click();
  cy.get('#day').clear().type(day);
}

function assertDayFeedbackWhenBlurred(feedback: string): void {
  cy.get('#day-helper-text').should('not.have.text', feedback);
  cy.get('#day').blur();
  cy.get('#day-helper-text').should('have.text', feedback);
}

describe('Date Select', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("starts with today's date selected", () => {
    const now = new Date();
    const day = now.getDate().toString();
    const month = (now.getMonth() + 1).toString();

    cy.get('#day').should('have.value', day);
    cy.get('input[name="month"]').should('have.value', month);
    cy.get('#month').should('have.text', MONTHS[now.getMonth()].name);
  });

  it('starts with the submit button enabled', () => {
    cy.get('#submit-search').should('be.enabled');
  });

  context('when invalid combinations are selected', () => {
    context('when day is over 31', () => {
      beforeEach(() => {
        selectDate('32', '7');
      });

      it('disables the submit button', () => {
        cy.get('#submit-search').should('be.disabled');
      });

      it('does not add error feedback until blurred', () => {
        assertDayFeedbackWhenBlurred('day must be less than 32');
      });
    });

    context('when day is below 1', () => {
      beforeEach(() => {
        selectDate('-1', '7');
      });

      it('disables the submit button', () => {
        cy.get('#submit-search').should('be.disabled');
      });

      it('does not add error feedback until blurred', () => {
        assertDayFeedbackWhenBlurred('day must be a positive number');
      });
    });

    context('when month and day are valid, but the day of month is not', () => {
      beforeEach(() => {
        selectDate('30', '2');
      });

      it('disables the submit button', () => {
        cy.get('#submit-search').should('be.disabled');
      });

      it('does not add error feedback until blurred', () => {
        assertDayFeedbackWhenBlurred('Invalid day for selected month');
      });
    });
  });

  context('when a valid combination is selected', () => {
    const day = '15';
    const month = '1';

    beforeEach(() => {
      selectDate(day, month);
    });

    it('enables the submit button', () => {
      cy.get('#submit-search').should('be.enabled');
    });

    it('it redirects to the yearDate route after submitting', () => {
      cy.get('#submit-search').click();
      cy.url().should('contain', `/year-date?day=${day}&month=${month}`);
    });
  });
});
