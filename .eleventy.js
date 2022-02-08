const yaml = require("js-yaml");
module.exports = function(eleventyConfig){
    eleventyConfig.setTemplateFormats([
        "jpg",
        "pdf",
        "md",
        "njk",
        "webp",
        "png",
        "css"
      ]);

      eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

    return {
        markdownTemplateEngine: "njk",    
    dir: {
        input: "src",
        output: "docs",
        layouts: "_layouts",
        data: "../.cache"

    },
    }
   
};