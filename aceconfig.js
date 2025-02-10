module.exports = {
    ruleArchive: "latest",
    policies: ["IBM_Accessibility"],
    failLevels: ["violation", "potentialviolation"],
    reportLevels: [
        "violation",
        "potentialviolation"
    ],
    outputFormat: ["json"],
    outputFilenameTimestamp: true,
    label: [process.env.TRAVIS_BRANCH],
    outputFolder: "results",
    baselineFolder: "test/baselines",
    cacheFolder: "/tmp/accessibility-checker"
};