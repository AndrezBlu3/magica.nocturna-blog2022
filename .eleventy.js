const htmlmin = require('html-minifier');
const dateFns = require('date-fns');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = function (eleventyConfig) {
  

  eleventyConfig.addPlugin(lazyImagesPlugin, {
    transformImgPath: (imgPath) => {
      if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
        // Handle remote file
        return imgPath;
      } else {
        return `./src/${imgPath}`;
      }
    },
  });

  eleventyConfig.setEjsOptions({
    rmWhitespace: true,
    context: {
      dateFns,
    },
  });

  eleventyConfig.setBrowserSyncConfig({
    files: './_site/assets/styles/main.css',
  });

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addPassthroughCopy("./src/assets/vendor");
  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy("./src/assets/styles");
  eleventyConfig.addPassthroughCopy("./src/assets/vids");
  eleventyConfig.addPassthroughCopy("./src/assets/js/theme.js");

  eleventyConfig.addPassthroughCopy("./src/assets/isotope/imagesloaded.pkgd.min.js");
  eleventyConfig.addPassthroughCopy("./src/assets/isotope/isotope.pkgd.min.js");
  eleventyConfig.addPassthroughCopy("./src/assets/isotope/packery-mode.pkgd.min.js");

  return {
    dir: { input: 'src', output: '_site', data: '_data' },
  };
};
