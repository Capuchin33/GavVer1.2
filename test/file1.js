var myModule  = require ('../src/driver.js');


describe('Test of workability', ()=>{
    it('Find element work or not?', async ()=>{
        global.url = 'https://www.google.com/';
        global.searchQuery = "Neodymium maladroiter";

        await myModule.getUrl(url);
        await driver.findElement(By.name('q')).sendKeys(searchQuery, Key.RETURN);
        var actualResult = await driver.findElement(By.id('result-stats')).isDisplayed();
        await assert.strictEqual(actualResult, true, 'Search is present');

    })
    it("Number of searches is more than ZERO", async ()=>{
        let resultsString = await driver.findElement(By.id("result-stats")).getText();

        console.log(resultsString);
        let startPoint = resultsString.indexOf("About ") + ("About ").length;
        let endPoint = resultsString.indexOf(" results ");
        global.results = parseFloat(resultsString.substring(startPoint, endPoint).replace(/,/g, ""));
        assert.strictEqual(results > 0, true, "We've got empty list of results");
    })
    it('Assert that there is less or equal results on the first page then was found', async ()=>{
        let resultsOnTheFirstPage = myModule.size(await driver.findElements(By.css("div#search div.g")));
        console.log("Results on the first page: " + resultsOnTheFirstPage);
        assert.strictEqual(resultsOnTheFirstPage <= results, true, "Results on the First page more that was found");
    })
    it("assert that we have only ONE search result on search query", ()=>{
        assert.strictEqual(results, 1, "We do not get only ONE search results. We've got " + results);
    })
    it("Assert that there is no element of navigation in the bottom of the page", async()=>{
        assert
            .strictEqual(
            myModule.isEmpty(await driver.findElements(By.css("div#center_col div[role='navigation'] td"))),
                true,
                "There is a navigation on the bottom of the search page!");
    })
    it('Assert that search query consists only from two words', ()=>{
        assert.strictEqual(myModule.wordCount(searchQuery), 2, "search query consists not from two words, but " + myModule.wordCount(searchQuery
        ));
        driver.quit()
    })

})
