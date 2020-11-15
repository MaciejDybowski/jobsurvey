const data = {
    surveyInfo: {
        surveyId: "superHash",
        surveyName: "Ankieta 1",
        surveyDescription: "Super opis ankiety",
    },
    questions: [
        {
            questionId: 5,
            questionName: "Jaką płcią będziesz?",
            questionType:  'select',
            questionAnswers: [
                {
                    answerId: 17,
                    answerName: "Kobieta",
                },
                {
                    answerId: 28,
                    answerName: "Mezczyzna",
                },
                {
                    answerId: 34,
                    answerName: "Chgw",
                },
            ],
        },
        {
            questionId: 6,
            questionName: "Na jakim jesteś poziomie?",
            questionType: 'radio',
            questionAnswers: [
                {
                    answerId: 456,
                    answerName: "Junior",
                },
                {
                    answerId: 534,
                    answerName: "MId",
                },
                {
                    answerId: 6345,
                    answerName: "Senior",
                },
            ],
        }
    ],
}

export default data