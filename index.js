// import scrapefrom from 'scrapefrom';
import got from 'got';
import htmlUrls from 'html-urls';
// import downloadImage from 'download-image';
// import download from 'download-file';
import fs from 'fs';
import request from 'request';
import fetch from 'node-fetch';

(async () => {
  const url = 'https://memegen-link-examples-upleveled.netlify.app/';
  if (!url) throw new TypeError('Need to provide an url as first argument.');
  const { body: html } = await got(url);
  const links = htmlUrls({ html, url });

  // Define array in which push all urls
  const allUrls = [];

  links.forEach(({ url }) => {
    //console.log(url);
    allUrls.push(url);
  });

  // console.log(`all Urls: ${allUrls}`);

  // Define array of image urls
  let imageUrls = allUrls.filter((url) =>
    url.startsWith('https://api.memegen.link/images'),
  );

  // Loop over the array of image urls and downloads the images
  for (let a = 0; a < 10; a++) {
    console.log(imageUrls[a]);

    // Create file for the [a] image
    fs.open(`./memes/0${a + 1}.jpg`, 'w', (err, file) => {
      if (err) {
        throw err;
      }
      console.log('File is created.');
    });

    // Downloads the image to this file

    const imageUrl = imageUrls[a];

    fetch(imageUrl).then((res) =>
      res.body.pipe(fs.createWriteStream(`./memes/0${a + 1}.jpg`)),
    );
  }
})();

// const imageUrl =
//   'https://api.memegen.link/images/ermg/ermahgerd/memes.jpg?width=300';

// fetch(imageUrl).then((res) =>
//   res.body.pipe(fs.createWriteStream('./memes/01.jpg')),
// );

// Create file for the [a] image
// fs.open('./memes/01.jpg', 'w', (err, file) => {
//   if (err) {
//     throw err;
//   }

//   console.log('File is created.');
// });

// Other Method do download images

// const download = (imageUrl, path, callback) => {
//   request.head(imageUrl, (err, res, body) => {
//   request(imageUrl)
//   .pipe(fs.createWriteStream(path))
//   .on(‘close’, callback)
//   })
//   }

//   const imageUrl = 'https://api.memegen.link/images/ermg/ermahgerd/memes.jpg?width=300'
//   const path = './memes/'

//   download(imageUrl, path, () => {
//   console.log(‘✅ Done!’)
//   })

// Download image and save to meme
// const url2 =
//   'https://api.memegen.link/images/ermg/ermahgerd/memes.jpg?width=300';

// const options = {
//   directory: './memes/',
//   filename: 'cat.gif',
// };

// download(url2, options, function (err) {
//   if (err) throw err;
//   console.log('Error in downloading the URL');
// });

// Download an image
// downloadImage(
//   'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300',
//   `./memes`,
// );

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
