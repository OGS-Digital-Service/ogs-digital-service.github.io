module.exports = function(eleventyConfig){
    eleventyConfig.setTemplateFormats([
        "md",
        "njk"
      ]);

      eleventyConfig.addPassthroughCopy("img");
      eleventyConfig.addPassthroughCopy("fonts");
      eleventyConfig.addPassthroughCopy("js");
      eleventyConfig.addPassthroughCopy("css");
      eleventyConfig.addPassthroughCopy("documents");
      eleventyConfig.addPassthroughCopy("calendar");
    

    return {
        markdownTemplateEngine: "njk",    
    dir: {
        layouts: "_layouts",
        output: "docs"
    }
    }
   
};