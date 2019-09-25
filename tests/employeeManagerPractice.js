module.exports = {
    beforeEach: browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html')
    },
    after: browser => {
        browser.end()
    },
    'Cannot make any changes after saving an error - Q5NH-47': browser => {
        browser
           .click('[name="employee1"]')
           .setValue('[name="phoneEntry"]', ['!']) 
           .click('#saveBtn')
           .pause(200)
           .setValue('[name="titleEntry"]', ['s'])
           .click('#saveBtn')
           .pause(500)
           .expect.element('[name="titleEntry"]').text.endsWith('s')
        browser
     },
    'Spacing error in over 10 characters message in phone text field - Q5NH45': browser => {
        browser
            .click('[name="employee1"]')
            .clearValue('[name="phoneEntry"]')
            .pause(1000)
            .setValue('[name="phoneEntry"]', ['123456'])
            .click('#saveBtn')
            .pause(1000)
            .assert.containsText('.errorCard', 'The phone number must be 10 digits long')
            
    },
    'Error for number of Title characters shows up in error for number of name characters': browser => {
        browser
            .click('[name="employee6"]')
            .setValue('[name="nameEntry"]', ['uuuuuuuuuuuu'])
            .click('#saveBtn')
            .expect.element('.errorCard').text.not.contain('The title field must be between 1 and 30 characters long.')
        browser
            .expect.element('.errorCard').text.contain('The title field must be between 1 and 30 characters long.')
        browser
    },
    'Does refreshing page undo all saved changes?': browser => {
        browser
            .click('[name="employee2"]')
            .setValue('[name="nameEntry"]', ['@'])
            .click('#saveBtn')
            .pause(3000)
            .click('[name="employee3"]')
            .pause(3000)
            .click('[name="employee2"]')
            .pause(5000)
            .assert.valueContains('[name="nameEntry"]', ["@"])

    },
    'Test for incorrect ID number for Teresa Osborne': browser => {
        browser
            .click('[name="employee4"]')
            .pause(5000)
            .expect.element('[name="employeeID"]').text.to.equal('ID: 4')
            browser
    },
    'Test for Phone text field error only prompted if less than 10 characters': browser => {
        browser
            .click('[name="employee1"]')
            .clearValue('[name="phoneEntry"]')
            .setValue('[name="phoneEntry"]', ['12345678901'])
            .click('#saveBtn')
            .assert.value('.errorCard', "The phone number must be 10 digits long.")
    },
    'Test for Navigating away from unsaved changes, saves them': browser => {
        browser
            .click('[name="employee5"]')
            .setValue('[name="titleEntry"]', ['@'])
            .click('[name="employee6"]')
            .click('[name="employee5"]')
            .expect.element('[name="titleEntry"]').text.to.not.contain("@")
        browser

    }
  
}