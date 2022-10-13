describe('Onload', function () {
  it('Front page can be opened', function () {
    cy.visit('http://localhost:5173');
    cy.get('#urlInput').should('be.visible');
    // TODO: login and register should be visible if not logged in
    // TODO: logout should be visible if logged in ( login register, should not be visible)
  });

  it('always gets new data on load', () => {
    cy.visit('http://localhost:5173');
    cy.intercept('GET', '**/api/links', (req) => {
      delete req.headers['if-none-match'];
    }).as('getLinks');

    cy.wait('@getLinks')
      .its('response')
      .should('deep.include', {
        statusCode: 200,
        statusMessage: 'OK',
      })
      .and('have.property', 'body')
      .then((body) => {
        expect(body.data).to.be.an('array');
      });

    cy.get('@getLinks').should(({ request, response }) => {
      expect(request.method).to.equal('GET');
    });
  });
});

describe('enter url', function () {
  it('valid url - api call (to be added)', () => {
    cy.get('input').clear();
    cy.get('input').type('www.google.com');
    cy.get('form').submit();
    // TODO: add tests for api call
    cy.get('p').contains(/^Valid URL$/);
  });
  it('invalid url - no api call', () => {
    cy.get('input').clear();
    cy.get('input').type('google');
    cy.get('form').submit();
    // TODO: add tests for no api call
    cy.get('p').contains(/^Invalid URL$/);
  });
});
