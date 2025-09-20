import puppeteer from 'puppeteer';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  console.info('POST scrapeRecipes');

  try {
    const { sitesToScrape } = await request.json();

    console.info('Scraping recipes from:', sitesToScrape);

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    const results = [];

    for (const url of sitesToScrape) {
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Récupère tout le texte visible de la page
      const pageText = await page.evaluate(() => document.body.innerText);

      results.push({
        url,
        fullText: pageText,
      });

      console.info('Scraped:', url);
    }

    await browser.close();

    console.info('Scraping completed', results);

    return Response.json({ results });
  } catch (error) {
    console.error('Erreur Puppeteer scraping:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
