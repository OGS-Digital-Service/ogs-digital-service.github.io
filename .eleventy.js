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