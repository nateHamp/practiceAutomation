module.exports = {
    beforeEach: browser => browser.url('https://devmountain-qa.github.io/employee-manager/1.0_Version/index.html'),
    after: browser => browser.end(),
    'Problem 1': browser => {
        browser
            .click('[name="employee7"]')
            .clearValue('[name="nameEntry"]')
            .setValue('[name="nameEntry"]', 'Billy Bob')
            .click('[name="employee9"]')
            .verify.value('[name="nameEntry"]', 'Eve Sparks')
            .click('[name="employee7"]')
            .verify.value('[name="nameEntry"]', 'Ruby Estrada')
            //Bug - The name Billy Bob saves without hitting the save button.
    },
    'Problem 2': browser => {
        browser.click('[name="employee5"]')
            .clearValue('[name="titleEntry"]')
            .setValue('[name="titleEntry"]', 'Best Manager Ever')
            .clearValue('[name="phoneEntry"]')
            .setValue('[name="phoneEntry"]', '1234567890')
            .click('#saveBtn')
            .click('[name="employee8"]')
            .expect.element('[name="titleEntry"]').value.not.to.equal('Best Manager Ever')
            browser
            .click('[name="employee5"]')
            .expect.element('[name="phoneEntry"]').value.to.equal('1234567890')
            browser
            .expect.element('[name="titleEntry"]').value.to.equal('Best Manager Ever')
            
            //Error - 1st line needs brackets around name=employee5. Need brackets around name=phoneEntry on 2nd expect assertion. Change text to value on last two assertions.
    },
    'Problem 3': browser => {
        browser
            .click('[name="employee1"]')
            .waitForElementPresent('[name="nameEntry"]')
            .clearValue('name="nameEntry"]')
            .setValue('[name="nameEntry"]', 'New Person')
            .click('#saveBtn')
            .click('[name="employee2"]')
            .expect.element('[name="nameEntry"]').value.not.to.equal('New Person').before(2000)
        browser
            .click('[name="employee1"]')
            .expect.element('[name="nameEntry"]').value.to.equal('New Person').before(2000)
        
            //Error - Need to include clearValue before setValue.
    },
    'Problem 4': browser => {
        browser
            .click('[name="employee5"]')
            .clearValue('[name="nameEntry"]')
            .click('#saveBtn')
            .assert.containsText('.errorCard', 'The name field must be between 1 and 30 characters long.')
            .assert.value('[name="nameEntry"]', 'Dollie Berry')
            //Bug - saving cleared value and not throwing error code.
    },
    'Problem 5': browser => {
        browser
            .click('[name="employee4"]')
            .clearValue('[name="phoneEntry"]')
            .setValue('[name="phoneEntry"]', '8015551234')
            .click('#cancelBtn')
            .click('[name="employee5"]')
            .click('[name="employee4"]')
            .expect.element('[name="phoneEntry"]').value.not.to.equal('8015551234')
            //Error - Missing bracket on 1st line to right of employee4.  Third line needs selector. Missing bracket left of name=phoneEntry on assertion line.
            //Bug - Employee 4 has an ID of -4. Error - cancelBtn needs to be a . not a #
    }
}