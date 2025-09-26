// services/risk.service.js

/**
 * Simple scoring logic for non-diagnostic risk assessment.
 * Each factor contributes a weight.
 * Returns risk level, score, and rationale.
 */

const RISK_WEIGHTS = {
    "smoking": 40,
    "low exercise": 20,
    "poor diet": 20
};

const calculateRisk = (factors) => {
    let score = 0;
    factors.forEach(f => {
        if (RISK_WEIGHTS[f]) score += RISK_WEIGHTS[f];
    });

    let risk_level = "low";
    if (score >= 70) risk_level = "high";
    else if (score >= 40) risk_level = "medium";

    return {
        risk_level,
        score,
        rationale: factors
    };
};

module.exports = { calculateRisk };
