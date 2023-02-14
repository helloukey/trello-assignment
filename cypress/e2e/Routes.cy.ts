describe("Validate User", () => {
  it("Homepage when user is available", () => {
    cy.visit("http://localhost:3000", {
      onBeforeLoad(win) {
        win.localStorage.setItem("trackier-current-user", "12345");
      },
    });
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGOUT");
    cy.get('a').contains("Trackier Assignment");
  });

  // Login Test
  it("Redirect to login page when user not available", () => {
    cy.visit('http://localhost:3000')
    cy.url().should('match', /login/)
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('a').contains("Trackier Assignment");
    cy.get('.css-binzgt > .MuiTypography-root').contains("Login");
  });

  it("Redirect to login page when user not available", () => {
    cy.visit('http://localhost:3000/')
    cy.url().should('match', /login/)
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('a').contains("Trackier Assignment");
    cy.get('.css-binzgt > .MuiTypography-root').contains("Login");
  });

  it("Homepage when user is available", () => {
    cy.visit("http://localhost:3000/login", {
      onBeforeLoad(win) {
        win.localStorage.setItem("trackier-current-user", "12345");
      },
    });
    cy.url().should('match', /http:\/\/localhost:3000\//);
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGOUT");
    cy.get('a').contains("Trackier Assignment");
  });

  // Signup Test
  it("Signup page", () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('.css-binzgt > .MuiTypography-root').contains("Signup");
  });

});
