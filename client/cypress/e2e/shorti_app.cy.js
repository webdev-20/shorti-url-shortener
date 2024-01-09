const username = 'testuser@example.com';
const password = 'testpassword';

describe('Shorti App', () => {
  before(() => {
    cy.request('POST', `${Cypress.env('backendUrl')}/api/testing/reset`);
  });

  describe('Onload', function () {
    it('Front page can be opened and url input bar is visible', function () {
      cy.visit('/');
      cy.get('#urlInput').should('be.visible');

      // TODO: logout should be visible if logged in ( login signup, should not be visible)
    });

    it('Login and Sign Up buttons when not logged in', function () {
      // TODO: login and signup should be visible if not logged in
      cy.contains('Login').should('be.visible');
      cy.contains('Sign Up').should('be.visible');
      cy.contains('Log Out').should('not.exist');
    });

    // TODO: this test will be moved to logged in landing page test
    xit('always gets new data on load', () => {
      cy.visit('/');
      cy.intercept('GET', '**/api/links', (req) => {
        delete req.headers['if-none-match'];
      }).as('getLinks');

      cy.wait('@getLinks', { timeout: 15000 })
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

  describe('authentication', () => {
    it('user can signup', () => {
      cy.visit('/');
      cy.contains('Sign Up').click();
      cy.intercept('POST', '**/api/users/signup', (req) => {
        delete req.headers['if-none-match'];
      }).as('register');

      cy.contains('Sign Up').click();
      cy.get('input[name="email"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('input[name="confirmPassword"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.contains('p', 'Sign up successful.').should('be.visible');

      cy.wait('@signup')
        .its('response')
        .should('deep.include', {
          statusCode: 200,
          statusMessage: 'OK',
        })
        .and('have.property', 'body')
        .then((body) => {
          expect(body.success).to.be.true;
        });
    });

    it('user cannot signup with existing username', () => {
      cy.visit('/');
      cy.contains('Sign Up').click();
      cy.intercept('POST', '**/api/users/signup', (req) => {
        delete req.headers['if-none-match'];
      }).as('register');

      cy.contains('Sign Up').click();
      cy.get('input[name="email"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('input[name="confirmPassword"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait('@signup')
        .its('response')
        .should('deep.include', {
          statusCode: 409,
          statusMessage: 'Conflict',
        })
        .and('have.property', 'body')
        .then((body) => {
          expect(body.success).to.be.false;
        });

      cy.contains('p', 'Account with that email address already exists.').should('be.visible');
    });

    it('user cannot signup with an invalid email', () => {
      cy.visit('/');
      cy.contains('Sign Up').click();
      cy.intercept('POST', '**/api/users/signup', (req) => {
        delete req.headers['if-none-match'];
      }).as('register');

      cy.contains('Sign Up').click();
      cy.get('input[name="email"]').type('invalidemail');
      cy.get('input[name="password"]').type(password);
      cy.get('input[name="confirmPassword"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait('@signup')
        .its('response')
        .should('deep.include', {
          statusCode: 400,
          statusMessage: 'Bad Request',
        })
        .and('have.property', 'body')
        .then((body) => {
          expect(body.success).to.be.false;
        });

      cy.contains('p', 'Please enter a valid email address.').should('be.visible');
    });

    it('user cannot signup with an invalid password', () => {
      cy.visit('/');
      cy.contains('Sign Up').click();

      cy.contains('Sign Up').click();
      cy.get('input[name="email"]').type(username);
      cy.get('input[name="password"]').type('abc');
      cy.get('input[name="confirmPassword"]').type('abc');
      cy.get('button[type="submit"]').click();

      cy.contains('p', 'Password must be at least 8 characters long').should('be.visible');
    });

    it('user can login', () => {
      cy.visit('/');
      cy.contains('Login').click();
      cy.intercept('POST', '**/api/users/login', (req) => {
        delete req.headers['if-none-match'];
      }).as('login');
      cy.get('input[name="email"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait('@login')
        .its('response')
        .should('deep.include', {
          statusCode: 200,
          statusMessage: 'OK',
        })
        .and('have.property', 'body')
        .then((body) => {
          expect(body.success).to.be.true;
        });

      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
      cy.contains('Log Out').should('be.visible');
      cy.contains(`Welcome ${username}`).should('be.visible');
    });

    it('user can logout', () => {
      // TODO: Add this when persistent log out is implemented
      //cy.visit('/');

      cy.contains('Log Out').click();
      cy.contains('Login').should('be.visible');
      cy.contains('Sign Up').should('be.visible');
      cy.contains(`Welcome ${username}`).should('not.exist');
    });

    it('user cannot login with wrong password', () => {
      cy.visit('/');
      cy.contains('Login').click();
      cy.intercept('POST', '**/api/users/login', (req) => {
        delete req.headers['if-none-match'];
      }).as('login');
      cy.get('input[name="email"]').type(username);
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();

      cy.wait('@login')
        .its('response')
        .should('deep.include', {
          statusCode: 401,
          statusMessage: 'Unauthorized',
        })
        .and('have.property', 'body')
        .then((body) => {
          expect(body.success).to.be.false;
          expect(body.message).to.equal('Incorrect password.');
        });

      cy.contains('Incorrect password.').should('be.visible');
    });

    it('user cannot login with wrong username', () => {
      cy.visit('/');
      cy.contains('Login').click();
      cy.intercept('POST', '**/api/users/login', (req) => {
        delete req.headers['if-none-match'];
      }).as('login');
      cy.get('input[name="email"]').type('wrongusername');
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait('@login')
        .its('response')
        .should('deep.include', {
          statusCode: 401,
          statusMessage: 'Unauthorized',
        })
        .and('have.property', 'body')
        .then((body) => {
          expect(body.success).to.be.false;
          expect(body.message).to.equal('User not found.');
        });

      cy.contains('User not found.').should('be.visible');
    });
  });

  describe('enter url', function () {
    const urlToShorten = 'www.google.com';

    it('valid url - api call (to be added)', () => {
      cy.visit('/');
      cy.intercept('POST', '**/api/links', (req) => {
        delete req.headers['if-none-match'];
      }).as('postLink');
      cy.get('input').clear();
      cy.get('input').type(`${urlToShorten}`);
      cy.get('form').submit();

      cy.wait('@postLink')
        .its('response')
        .should('deep.include', {
          statusCode: 201,
          statusMessage: 'Created',
        })
        .and('have.property', 'body')
        .then((body) => {
          expect(body.success).to.be.true;
          expect(body.data.url).to.equal(urlToShorten);
        });
    });
    it('invalid url - no api call', () => {
      cy.visit('/');
      cy.intercept('POST', '**/api/links', (req) => {
        delete req.headers['if-none-match'];
      }).as('postLink');
      cy.get('input').clear();
      cy.get('input').type('google');
      cy.get('form').submit();

      cy.wait(2000);
      cy.get('@postLink').then((interceptions) => {
        assert.isNull(interceptions);
      });
    });
  });
});
