const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const express = require('express');
const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  const products = await getProducts();
  const links = products.map((p) => ({
    url: `/product/${p.slug}`,
    changefreq: 'weekly',
    priority: 0.8
  }));

  const stream = new SitemapStream({ hostname: 'https://trendcrave.it.com' });
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

module.exports = router;
