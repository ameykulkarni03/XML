// script.js

const form = document.getElementById('sitemap-form');
const urlInput = document.getElementById('url');
const freqSelect = document.getElementById('frequency');
const priorityInput = document.getElementById('priority');
const output = document.getElementById('sitemap-output');

async function generateSitemap(url, freq, priority) {

  // Fetch pages
  const pages = await getPages(url);

  // Generate sitemap content
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;  

  pages.forEach(page => {
    sitemap += `
      <url>
        <loc>${url}${page}</loc>
        <changefreq>${freq}</changefreq>
        <priority>${priority}</priority>
      </url>`;
  });

  sitemap += `</urlset>`;

  // Output sitemap
  output.textContent = sitemap;

}

async function getPages(url) {
  
  const response = await fetch('./fetch-pages.php?url=' + encodeURIComponent(url));
  
  return [response.text()];

}

form.addEventListener('submit', e => {
  e.preventDefault();

  const url = urlInput.value;
  const freq = freqSelect.value;
  const priority = priorityInput.value;

  generateSitemap(url, freq, priority);

});