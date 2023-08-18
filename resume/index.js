import { promises as fs } from 'fs'
import * as theme from 'jsonresume-theme-macchiato'
import puppeteer from 'puppeteer'
import { render } from 'resumed'

const resume = JSON.parse(await fs.readFile('viacheslav_mogilevskii_cv.json', 'utf-8'))
const html = await render(resume, theme)

const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.setContent(html, { waitUntil: 'networkidle0' })
await page.pdf({ path: 'viacheslav_mogilevskii_cv.pdf', format: 'a4', printBackground: false,  margin: {top: 0, right: 0, bottom: 0, left: 0}})
await browser.close()