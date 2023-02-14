describe("Authenticate User", () => {

  it("Successful Authentication", () => {
    cy.visit("http://localhost:3000/login", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "kunal",
          JSON.stringify({username: "kunal", email: "kunalukey32@gmail.com", password: "Kunal@321"})
        );
        cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
        cy.get("#username").type("kunal");
        cy.get("#password").type("Kunal@321");
        cy.get(".MuiBox-root > .MuiButtonBase-root").click();
        cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGOUT");
        cy.url().should('match', /http:\/\/localhost:3000\//);
      },
    });
  });

  it("Wrong Username", () => {
    cy.visit("http://localhost:3000/login", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "kunal",
          JSON.stringify({username: "kunal", email: "kunalukey32@gmail.com", password: "Kunal@321"})
        );
        cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
        cy.get("#username").type("Kunal");
        cy.get("#password").type("Kunal@321");
        cy.get(".MuiBox-root > .MuiButtonBase-root").click();
        cy.get('.css-binzgt > .MuiBox-root > .MuiPaper-root').contains("No such user found.")
      },
    });
  });

  it("Wrong Password", () => {
    cy.visit("http://localhost:3000/login", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "kunal",
          JSON.stringify({username: "kunal", email: "kunalukey32@gmail.com", password: "Kunal@321"})
        );
        cy.get('.MuiToolbar-root > .MuiButtonBase-root').contains("LOGIN");
        cy.get("#username").type("kunal");
        cy.get("#password").type("Kunal@123");
        cy.get(".MuiBox-root > .MuiButtonBase-root").click();
        cy.get('.css-binzgt > .MuiBox-root > .MuiPaper-root').contains("Invalid password.")
      },
    });
  });

});
