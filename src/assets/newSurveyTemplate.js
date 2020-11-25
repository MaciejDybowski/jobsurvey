const questions = [
    {
        questionName: "Jakiej jesteś płci?",
        questionType: "select",
        questionPosition: 0,
        questionId: 1,
        chartType: 'doughnut',
        questionAnswers: [
            {
                answerId: 1,
                answerName: "Kobieta",
            },
            {
                answerId: 2,
                answerName: "Mezczyzna",
            },
            {
                answerId: 3,
                answerName: "Non-binary",
            },
        ],
    },
    {
        questionName: "Na jakim jesteś poziomie?",
        questionType: "radio",
        questionPosition: 1,
        questionId: 2,
        chartType: 'doughnut',
        questionAnswers: [
            {
                answerId: 4,
                answerName: "Junior",
            },
            {
                answerId: 5,
                answerName: "Mid",
            },
            {
                answerId: 6,
                answerName: "Senior",
            },
        ],
    },
    {
        questionName: "Jakim typem programisty jestes?",
        questionType: "radio",
        questionPosition: 2,
        questionId: 3,
        chartType: 'horizontalbar',
        questionAnswers: [
            {
                answerId: 7,
                answerName: "Frontend",
            },
            {
                answerId: 8,
                answerName: "Fullstack",
            },
            {
                answerId: 9,
                answerName: "Backend",
            },
            {
                answerId: 10,
                answerName: "Mobile",
            },
            {
                answerId: 11,
                answerName: "Embedded",
            },
            {
                answerId: 12,
                answerName: "Innym",
            },

        ],
    },
    {
        questionName: "Jaki jest główny język programowania?",
        questionType: "radio",
        questionPosition: 3,
        questionId: 4,
        chartType: 'horizontalbar',
        questionAnswers: [
            {
                answerId: 13,
                answerName: "Java",
            },
            {
                answerId: 14,
                answerName: "C",
            },
            {
                answerId: 15,
                answerName: "SQL",
            },
            {
                answerId: 16,
                answerName: "Python",
            },
            {
                answerId: 17,
                answerName: "C++",
            },
            {
                answerId: 18,
                answerName: "C#",
            },
            {
                answerId: 19,
                answerName: "TypeScript",
            },
            {
                answerId: 20,
                answerName: "PHP",
            },
            {
                answerId: 21,
                answerName: "JavaScript",
            },
            {
                answerId: 22,
                answerName: "Go",
            },
            {
                answerId: 23,
                answerName: "Inny",
            },
        ],
    },
]

export default questions;