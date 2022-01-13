import scrapefrom from 'scrapefrom';
import got from 'got';
import htmlUrls from 'html-urls';
import downloadImage from 'download-image';

(async () => {
  const url = 'https://memegen-link-examples-upleveled.netlify.app/';
  if (!url) throw new TypeError('Need to provide an url as first argument.');
  const { body: html } = await got(url);
  const links = htmlUrls({ html, url });

  // Define array in which push all urls
  let allUrls = [];

  links.forEach(({ url }) => {
    //console.log(url);
    allUrls.push(url);
  });

  //console.log(`all Urls: ${allUrls}`);

  // Define array of image urls
  let imageUrls = allUrls.filter((url) =>
    url.startsWith('https://api.memegen.link/images'),
  );
  console.log(imageUrls);
  console.log(imageUrls.length);

  // Loop over the array of image urls
  for (let a = 0; a < 10; a++) {
    console.log(imageUrls[a]);
  }
})();

// Download an image
downloadImage(
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300',
  `./memes`,
);

// (async () => {
//   const url = 'https://memegen-link-examples-upleveled.netlify.app/';
//   if (!url) throw new TypeError('Need to provide an url as first argument.');
//   const { body: html } = await got(url);
//   const links = htmlUrls({ html, url });

//   links.forEach(({ url }) => console.log(url));
// })();

// let scrapedHTML = [];
// scrapefrom('https://memegen-link-examples-upleveled.netlify.app/').then((e) => {
//   // console.log(e.result.html_raw_full);
//   scrapedHTML.push(e.result.html_raw_full);
//   console.log(typeof e.result.html_raw_full);
//   console.log(scrapedHTML);
// });

// import request from 'request';
// import cheerio from 'cheerio';
// const url = 'http://www.html.it/autore/gabroman/';
// import fs from 'fs';

// const getPage = (cb) => {
//   request(
//     url,
//     {
//       timeout: 3000,
//     },
//     (error, response, body) => {
//       if (!error) {
//         cb(body);
//       }
//     },
//   );
// };

// const savePage = (data) => {
//   let contents = "'use strict';" + '\n\n';
//   contents += 'const HTMLItArticles = ';
//   contents += JSON.stringify(data) + ';\n\n';
//   contents += 'module.exports = HTMLItArticles;';

//   fs.writeFileSync(test + '/articles.js', contents);
// };

// const parsePage = (data) => {
//   const $ = cheerio.load(data);
//   let output = [];
//   $('.author-article').each((i, elem) => {
//     let $a = $(elem).find('a');
//     let datum = {
//       title: $a.text(),
//       url: $a.attr('href'),
//     };
//     output.push(datum);
//   });
//   return output;
// };

// getPage((html) => {
//   let data = parsePage(html);
//   savePage(data);
// });
