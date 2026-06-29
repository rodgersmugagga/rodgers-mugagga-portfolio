import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://rodgers-mugagga-portfolio.netlify.app';
const API_URL = process.env.VITE_API_URL || 'http://localhost:3000';

async function generateSitemap() {
  try {
   
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1">

  <!-- Static Pages -->
  <url><loc>${BASE_URL}/</loc><changefreq>daily</changefreq><priority>1.0</priority><lastmod>${new Date().toISOString().split('T')[0]}</lastmod></url>
  <url><loc>${BASE_URL}/about</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${new Date().toISOString().split('T')[0]}</lastmod></url>
  <url><loc>${BASE_URL}/projects</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${new Date().toISOString().split('T')[0]}</lastmod></url>
  <url><loc>${BASE_URL}/experience</loc><changefreq>monthly</changefreq><priority>0.8</priority><lastmod>${new Date().toISOString().split('T')[0]}</lastmod></url>
  <url><loc>${BASE_URL}/contact</loc><changefreq>monthly</changefreq><priority>0.7</priority><lastmod>${new Date().toISOString().split('T')[0]}</lastmod></url>

</urlset>`;

    fs.writeFileSync(path.join(path.resolve(), 'public', 'sitemap.xml'), sitemap, 'utf8');

    console.log('✅ Sitemap generated successfully!');
  } catch (err) {
    console.error('❌ Error generating sitemap:', err.message);
  }
}

generateSitemap();
