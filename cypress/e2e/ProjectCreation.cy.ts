describe("Project Creation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/", {
        onBeforeLoad(win) {
          win.localStorage.setItem(
            "kunal",
            JSON.stringify({
              username: "kunal",
              email: "kunalukey32@gmail.com",
              password: "Kunal@321",
            })
          );
          win.localStorage.setItem("trackier-current-user", "kunal"); 
        },
      });
  });

  it("Success Open Modal", () => {
    cy.get('.css-zuu245-MuiContainer-root > :nth-child(1) > .MuiButtonBase-root').click();
    cy.get('.css-dvxtzn > .MuiTypography-root').contains("Add Project");
  })

  it("Successful Add Project", () => {
    cy.get('.css-zuu245-MuiContainer-root > :nth-child(1) > .MuiButtonBase-root').click();
    cy.get('.css-dvxtzn > .MuiTypography-root').contains("Add Project");
    cy.get('#title').type("Test Project");
    cy.get('#description').type("Test Project Description Test Project Description Test Project Description Test Project Description Test Project Description.");
    cy.get('[style="margin-top: 8px;"] > label').selectFile("cypresstest.png");
    cy.get('[style="margin-top: 8px;"] > label').not("Add Image");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('.MuiTypography-h5').contains("Test Project");
  });

  it("Successful Delete Project", () => {
    cy.get('.css-zuu245-MuiContainer-root > :nth-child(1) > .MuiButtonBase-root').click();
    cy.get('.css-dvxtzn > .MuiTypography-root').contains("Add Project");
    cy.get('#title').type("Test Project");
    cy.get('#description').type("Test Project Description Test Project Description Test Project Description Test Project Description Test Project Description.");
    cy.get('[style="margin-top: 8px;"] > label').selectFile("cypresstest.png");
    cy.get('[style="margin-top: 8px;"] > label').not("Add Image");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('.MuiTypography-h5').contains("Test Project");
    cy.get('[style="display: flex; justify-content: flex-end;"] > .MuiButtonBase-root').click();
  });

  it("Project title less than 3 characters", () => {
    cy.get('.css-zuu245-MuiContainer-root > :nth-child(1) > .MuiButtonBase-root').click();
    cy.get('.css-dvxtzn > .MuiTypography-root').contains("Add Project");
    cy.get('#title').type("t");
    cy.get('#description').type("Test Project Description Test Project Description Test Project Description Test Project Description Test Project Description.");
    cy.get('[style="margin-top: 8px;"] > label').selectFile("cypresstest.png");
    cy.get('[style="margin-top: 8px;"] > label').not("Add Image");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('.MuiAlert-message').contains("Title should be between 3 to 15 characters long.");
  });

  it("Project title greater than 15 characters", () => {
    cy.get('.css-zuu245-MuiContainer-root > :nth-child(1) > .MuiButtonBase-root').click();
    cy.get('.css-dvxtzn > .MuiTypography-root').contains("Add Project");
    cy.get('#title').type("tttttttttttttttttttt");
    cy.get('#description').type("Test Project Description Test Project Description Test Project Description Test Project Description Test Project Description.");
    cy.get('[style="margin-top: 8px;"] > label').selectFile("cypresstest.png");
    cy.get('[style="margin-top: 8px;"] > label').not("Add Image");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('.MuiAlert-message').contains("Title should be between 3 to 15 characters long.");
  });

  it("Project description less than 50 characters", () => {
    cy.get('.css-zuu245-MuiContainer-root > :nth-child(1) > .MuiButtonBase-root').click();
    cy.get('.css-dvxtzn > .MuiTypography-root').contains("Add Project");
    cy.get('#title').type("Test Project");
    cy.get('#description').type("Project Description");
    cy.get('[style="margin-top: 8px;"] > label').selectFile("cypresstest.png");
    cy.get('[style="margin-top: 8px;"] > label').not("Add Image");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('.MuiAlert-message').contains("Description should be between 50 to 150 characters long.");
  });

  it("Project description greater than 150 characters", () => {
    cy.get('.css-zuu245-MuiContainer-root > :nth-child(1) > .MuiButtonBase-root').click();
    cy.get('.css-dvxtzn > .MuiTypography-root').contains("Add Project");
    cy.get('#title').type("Test Project");
    cy.get('#description').type("Test Project Description Test Project Description Test Project Description Test Project Description Test Project Description. Test Project Description Test Project Description Test Project Description Test Project Description Test Project Description.");
    cy.get('[style="margin-top: 8px;"] > label').selectFile("cypresstest.png");
    cy.get('[style="margin-top: 8px;"] > label').not("Add Image");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('.MuiAlert-message').contains("Description should be between 50 to 150 characters long.");
  });

  it("Image size greater than 100kb", () => {
    cy.get('.css-zuu245-MuiContainer-root > :nth-child(1) > .MuiButtonBase-root').click();
    cy.get('.css-dvxtzn > .MuiTypography-root').contains("Add Project");
    cy.get('#title').type("Test Project");
    cy.get('#description').type("Test Project Description Test Project Description Test Project Description Test Project Description Test Project Description.");
    cy.get('[style="margin-top: 8px;"] > label').selectFile("angel.png");
    cy.get('[style="margin-top: 8px;"] > label').not("Add Image");
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('.MuiAlert-message').contains("Image size should be less than 100kb.");
  });

});
