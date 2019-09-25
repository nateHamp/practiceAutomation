module.export = {
    beforeEach: browser => {
    browser.url('https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html')

    },
    after: browser => {
        browser.end()
    },
    'Create new employee': browser => {
        browser
            .click('[name="addEmployee"]')
            .setValue('[name="nameEntry"]', ['Dane Cook'])
            .setValue('[name="phoneEntry"]', ['12312345679'])
            .setValue('[name="titleEntry"]', ['Jester'])
            .click('#saveBtn')
    }
}