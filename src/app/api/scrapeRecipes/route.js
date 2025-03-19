import puppeteer from 'puppeteer';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { sitesToScrape } = await request.json();

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
    }

    await browser.close();

    return Response.json({ results });
  } catch (error) {
    console.error('Erreur Puppeteer scraping:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
