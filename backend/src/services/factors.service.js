// services/factor.service.js

/**
 * Converts answers to risk factors.
 * Confidence based on number of factors identified.
 */

const extractFactors = (answers) => {
    const factors = [];

    if (answers.smoker) factors.push("smoking");
    if (answers.exercise === "rarely" || answers.exercise === "none") factors.push("low exercise");
    if (answers.diet.includes("sugar") || answers.diet.includes("junk")) factors.push("poor diet");

    // Metric: ratio of detected factors to possible risk factors
    const total_possible = 3;
    const confidence = factors.length / total_possible;

    return { factors, confidence };
};

module.exports = { extractFactors };
