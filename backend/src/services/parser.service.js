// backend/src/services/parser.service.js

const parseAnswers = (text) => {
    if (!text || typeof text !== "string") {
        throw new Error("parseAnswers: input must be a string");
    }

    const lines = text.split('\n');
    const answers = {};
    const missing_fields = [];

    lines.forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) {
            switch (key.toLowerCase()) {
                case 'age':
                    answers.age = parseInt(value);
                    break;
                case 'smoker':
                    answers.smoker = value.toLowerCase() === 'yes';
                    break;
                case 'exercise':
                    answers.exercise = value;
                    break;
                case 'diet':
                    answers.diet = value;
                    break;
            }
        }
    });

    // Track missing fields
    ['age', 'smoker', 'exercise', 'diet'].forEach(field => {
        if (answers[field] === undefined) missing_fields.push(field);
    });

    const confidence = 0.9; // Placeholder parser confidence
    return { answers, missing_fields, confidence };
};

module.exports = { parseAnswers };
