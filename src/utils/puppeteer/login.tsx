const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
import {Browser} from 'puppeteer'

puppeteer.use(StealthPlugin())

const {executablePath} = require('puppeteer')

interface ILogin {
    url: string
    userName: TUserName
    password: TPassword
    clickSelector: string
}

type TUserName = {
    selector: string;
    text: string
}

type TPassword = {
    selector: string;
    text: string
}

/**
 * @AutoLogin
 *
 * This function automatically logs in a user using username and password, it clicks the confirm button to redirect to home page.
 *
 * @param options Options for login
 * @param options.url The URL of the login page
 * @param options.userName.text The text for the username field
 * @param options.userName.selector The id of the input component
 * @param options.password.text The text for the password field
 * @param options.password.selector The id of the input component
 * @param options.clickSelector The id of the confirm button
 *
 * @example
 * import login from '../utils/puppeteer/login
 *
 * const myFunc = () => {
 *    login(options)
 * }
 */
export const login = async (options: ILogin) => {
    const browser: Browser = await puppeteer.luanch({headless: true, executablePath})
    const page = await browser.newPage()
    await page.goto(options.url)

    await page.type(options.userName.selector, options.userName.text)
    await page.type(options.password.selector, options.password.text)
    const [response] = await Promise.all([
        page.waitForNavigation(),
        page.click(options.clickSelector),
    ])

    if(response && response.ok()){
        console.log('complete')
    }
}
