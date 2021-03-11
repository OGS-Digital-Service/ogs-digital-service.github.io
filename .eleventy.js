module.exports = function(eleventyConfig){
    eleventyConfig.setTemplateFormats([
        "jpg",
        "pdf",
        "md",
        "njk",
        "webp"
      ]);

    return {
        markdownTemplateEngine: "njk",    
    dir: {
        input: "src",
        output: "docs",
        layouts: "_layouts"
    },
    }
   
};