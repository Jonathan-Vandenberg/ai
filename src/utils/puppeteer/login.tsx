const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
import {Browser} from 'puppeteer'

puppeteer.use(StealthPlugin())

const {executablePath} = require('puppeteer')

const url = ''

const main = async () => {
    const browser: Browser = await puppeteer.luanch({headless: true, executablePath})

    const page = await browser.newPage()
    await page.goto(url)

    await page.type('#id-of-input-field', 'input-text')
    const [response] = await Promise.all([
        page.waitForNavigation(),
        page.click('#id-of-buttton'),
    ])

    if(response && response.ok()){
        console.log('complete')
    }
}
