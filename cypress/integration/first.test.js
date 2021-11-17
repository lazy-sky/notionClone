describe('', () => {
  it('visit test', () => {
    // 근데 오류남
    cy.visit('/')
  })

  it('nested page visit', () => {
    cy.get('nav ul li:first-child span.material-icons')
      .contains('play_arrow')
      .click()
    
    cy.wait(1000)
    
    cy.get('nav ul li:nth-child(1) > ul li:nth-child(1) .text')
      .contains('Hello world!')
      .click()
  })

  it('', () => {
    cy.get('.page__container .title[contenteditable]')
      .clear()
      .type('반갑습니다')
      .blur()
  })
})