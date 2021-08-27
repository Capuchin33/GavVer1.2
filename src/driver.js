var chromedriver = require ('chromedriver');
var {Builder, By, Key, until} = require ('selenium-webdriver');
var webdriver = require ('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();
var assert = require ('assert')

class BasePage {
    constructor() {
        global.driver = driver
        global.assert = assert
        global.Key = Key
        global.By = By
        global.until = until
    }

    getUrl(url) {
        driver.get(url)
    }

    size(object) {
        let i = 0;
        for (let x in object) {
            i++
        }
        return i;
    }

    isEmpty(object) {
        for (let x in object) {
            return false;
        }
        return true;
    }

    wordCount(query) {
        let count = 0;
        for (let i = 0; i < query.length; i++) {
            if (query.charAt(i) === " ") {
                count++;
            }
        }
        count++; //space + 1
        return count;
    }
}
module.exports = new BasePage();