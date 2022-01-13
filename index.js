import got from 'got';
import htmlUrls from 'html-urls';
import fs from 'fs';
import request from 'request';
import fetch from 'node-fetch';

async function memescraper() {
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
}

memescraper();
