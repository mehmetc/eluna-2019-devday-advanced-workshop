describe('searchbar-submenu', () => {
  before(() => {
    cy.visit('/search?vid=NYU');
  })

  describe('submenu', () => {
    it('exists', () => {
      cy.wait(5000);
      cy.get('search-bar-sub-menu > .layout-align-end-center').as('subMenu');      
    })

    it('is visible', () => {
      cy.get('search-bar-sub-menu > .layout-align-end-center').should('be.visible');      
    })

    describe('has the correct menu items', () => {
      const submenuItems = [
        {
          label: "Provide Feedback",
          link: "https://nyu.qualtrics.com/jfe/form/SV_blQ3OFOew9vl6Pb?Source=NYU",
        },
        {
          label: "Library Hours",
          link: "https://guides.nyu.edu/library-hours",
        }
      ]

      it(`has ${submenuItems.length} buttons`, () => {
        cy.get('.layout-align-end-center > ul > li').should('have.length', submenuItems.length);;
      })

      submenuItems.forEach(({ label, link }, idx) => {
        it(`has a button with ${label} which opens ${link} when clicked`, () => {
          cy.window().then(win => () => {
            const spy = cy.stub(win, 'open');

            cy.get('.layout-align-end-center > ul > li > button')
            .eq(idx).should('contain', label)
            .click()
            .then(() => {
              expect(spy).to.be.called.with(link);
            });
          });
        })
      })
    })
  })
})