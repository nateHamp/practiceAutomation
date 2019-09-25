module.exports = {
    beforeEach: browser => {
        browser.url('http://www.google.com')
    },
    after: browser => {
        browser.end()
    },
    'Google Search Test': browser => { 
       browser
        .setValue('input[name="q"]', ['Monsters', browser.Keys.ENTER])
        .pause(10000)
        .expect.element('input[name="q"]').value.to.equal('Monsters')
        browser
        

        
        
    }
    
}