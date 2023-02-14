describe("Register User", () => {

  it("Successful Registration", () => {
    cy.clearAllLocalStorage();
    cy.visit("http://localhost:3000/signup");
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('#username').type("tester")
    cy.get('#email').type("tester@gmail.com")
    cy.get('#password').type("Tester@321");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGOUT");
  });

  it("Username less than 3 characters", () => {
    cy.clearAllLocalStorage();
    cy.visit("http://localhost:3000/signup");
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('#username').type("t")
    cy.get('#email').type("tester@gmail.com")
    cy.get('#password').type("Tester@321");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('#username-helper-text').contains("Username must be between 3 to 15 characters long.")
  });

  it("Username more than 15 characters", () => {
    cy.clearAllLocalStorage();
    cy.visit("http://localhost:3000/signup");
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('#username').type("tttttttttttttttttttt")
    cy.get('#email').type("tester@gmail.com")
    cy.get('#password').type("Tester@321");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('#username-helper-text').contains("Username must be between 3 to 15 characters long.")
  });

  it("Invalid email", () => {
    cy.clearAllLocalStorage();
    cy.visit("http://localhost:3000/signup");
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('#username').type("tester")
    cy.get('#email').type("tester@")
    cy.get('#password').type("Tester@321");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('#email-helper-text').contains("Invalid Email Address.")
  });

  it("Invalid password with only small letters", () => {
    cy.clearAllLocalStorage();
    cy.visit("http://localhost:3000/signup");
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('#username').type("tester")
    cy.get('#email').type("tester@gmail.com")
    cy.get('#password').type("tester");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('#password-helper-text').contains("Password must be of minimum 8 characters with at least one uppercase, one lowercase, one number, and one special character.")
  });

  it("Invalid password with only capital letters", () => {
    cy.clearAllLocalStorage();
    cy.visit("http://localhost:3000/signup");
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('#username').type("tester")
    cy.get('#email').type("tester@gmail.com")
    cy.get('#password').type("TESTER");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('#password-helper-text').contains("Password must be of minimum 8 characters with at least one uppercase, one lowercase, one number, and one special character.")
  });

  it("Invalid password with only numbers", () => {
    cy.clearAllLocalStorage();
    cy.visit("http://localhost:3000/signup");
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('#username').type("tester")
    cy.get('#email').type("tester@gmail.com")
    cy.get('#password').type("12345");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('#password-helper-text').contains("Password must be of minimum 8 characters with at least one uppercase, one lowercase, one number, and one special character.")
  });

  it("Invalid password with only special characters", () => {
    cy.clearAllLocalStorage();
    cy.visit("http://localhost:3000/signup");
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('#username').type("tester")
    cy.get('#email').type("tester@gmail.com")
    cy.get('#password').type("@#$%^$");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('#password-helper-text').contains("Password must be of minimum 8 characters with at least one uppercase, one lowercase, one number, and one special character.")
  });

  it("Invalid password with less than 8 characters", () => {
    cy.clearAllLocalStorage();
    cy.visit("http://localhost:3000/signup");
    cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
    cy.get('#username').type("tester")
    cy.get('#email').type("tester@gmail.com")
    cy.get('#password').type("tester1");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('#password-helper-text').contains("Password must be of minimum 8 characters with at least one uppercase, one lowercase, one number, and one special character.")
  });

});
