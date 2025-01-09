// const express = require('express')
// const puppeteer = require('puppeteer');
// const router = express.Router();

// router.get("/scrape", async (req, res) => {
//     const {contestName = "START167", category = "C"} = req.query
//     try {
//         const browser = await puppeteer.launch({ headless: true });
//         const page = await browser.newPage();

//         const url = `https://www.codechef.com/rankings/${contestName}${category}?filterBy=Institution%3DIndian%20Institute%20of%20Information%20Technology%20Design%20and%20Manufacturing%2C%20Kurnool&itemsPerPage=100&order=asc&page=1&sortBy=rank`;
//         await page.goto(url, { waitUntil: 'networkidle2' });

//         await page.waitForSelector('.MuiPaper-root');

//         const data = await page.evaluate(() => {
//             const rows = Array.from(document.querySelectorAll('.MuiPaper-root table tbody tr'));
//             return rows.map(row => {
//                 const columns = row.querySelectorAll('td');
//                 return Array.from(columns).map(col => col.innerText.trim());
//             });
//         });

//         await browser.close();
//         res.status(200).json({
//             contestData: data,
//         })
//     } catch (error) {
//         console.error("Error occurred while scraping:", error);
//         res.status(500).send({ error: "Failed to scrape the data" });
//     }
// });

// module.exports = router;

const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.get("/scrape", async (req, res) => {
    const { contestName = "START167", category = "C" } = req.query;

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        const url = `https://www.codechef.com/rankings/${contestName}${category}?filterBy=Institution%3DIndian%20Institute%20of%20Information%20Technology%20Design%20and%20Manufacturing%2C%20Kurnool&itemsPerPage=100&order=asc&page=1&sortBy=rank`;
        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.waitForSelector('.MuiPaper-root');

        const data = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('.MuiPaper-root table tbody tr'));
            return rows.map(row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns).map(col => col.innerText.trim());
            });
        });
        console.log(data)
        // Transform the scraped data into a structured JSON format
        const structuredData = data.map(row => {
            return {
                rank: parseInt(row[0]?.replace("Rank\n\n", "").trim()) || null,
                username: row[1]?.replace("Username\n", "").split('\n')[0].trim().slice(2) || null,
                institute: row[1]?.split('\n')[3].trim() || null,
                totalScore: parseInt(row[2]?.replace("Total Score\n", "").trim()) || null,
                lastAC: row[3]?.replace("Last AC\n\n", "").trim() || null,
                problems: [
                    parseInt(row[4]?.replace("P1\n","").trim()),
                    parseInt(row[5]?.replace("P2\n","").trim()),
                    parseInt(row[6]?.replace("P3\n","").trim()),
                    parseInt(row[7]?.replace("P4\n","").trim()),
                ]
                
            };
        });

        await browser.close();

        // Respond with structured JSON data
        res.status(200).json({
            contestData: structuredData
        });
    } catch (error) {
        console.error("Error occurred while scraping:", error);
        res.status(500).send({ error: "Failed to scrape the data" });
    }
});

module.exports = router;
