describe('Testing Halaman Register', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it('Menampilkan halaman register', () => {
    cy.contains('Create an account').should('be.visible');
  });

  it('Menampilkan semua field input', () => {
    cy.get('#name').should('be.visible');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');

    cy.contains('Sign Up').should('be.visible');
  });

  it('User dapat mengisi semua field', () => {

    cy.get('#name')
      .type('Najwa Nuraisyah')
      .should('have.value', 'Najwa Nuraisyah');

    cy.get('#email')
      .type('najwa@gmail.com')
      .should('have.value', 'najwa@gmail.com');

    cy.get('#password')
      .type('Password123')
      .should('have.value', 'Password123');
  });

  it('User dapat menekan tombol Sign Up', () => {

    cy.get('#name').type('Najwa');

    cy.get('#email').type('najwa@gmail.com');

    cy.get('#password').type('Password123');

    cy.contains('button','Sign Up').click();

  });

});