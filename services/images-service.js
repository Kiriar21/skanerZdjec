const puppeteer = require('puppeteer');

module.exports = { 
    async getImages(url){
        const browser = await puppeteer.launch({ headless: "new" })
        const page = await browser.newPage()
        await page.goto(url)

        await page.waitForTimeout(10000) // ile ms czekamy na załadowanie strony

        const images = await page.evaluate(() => {
            const imgElements = document.querySelectorAll('img')
            const urls = Array.from(imgElements).map(img => img.src)
            return urls
        })

        await browser.close()

        return images;

    }
}
