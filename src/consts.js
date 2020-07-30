const quiz0001 = {
    quizName: "Co wiesz o Celice?",
    quizDescription: "Ten test sprawdzi Twoją wiedzę na temat historii rozwoju Toyoty Celiki.",
    quizData: {
        q1: {
            questionText: "Kiedy zbudowano pierwszą Celicę?",
            answerOptions: {
                a1: "W roku 1444.",
                a2: "12 kwietnia.",
                a3: "O 12:33.",
                a4: "Po podwieczorku.",
            },
            correctAnswer: 'a2'
        },
        q2: {
            questionText: "W której generacji Celiki pojawiła się odmiara Celica Supra?",
            answerOptions: {
                a1: "I.",
                a2: "XXI.",
                a3: "II.",
                a4: "V."
            },
            correctAnswer: 'a3'
        },
        q3: {
            questionText: "Ile kół ma Celica?",
            answerOptions: {
                a1: "4",
                a2: "2",
                a3: "8",
                a4: "Wszystkie!"
            },
            correctAnswer: 'a1'
        },
        q4: {
            questionText: "Którędy Celica?",
            answerOptions: {
                a1: "Nie znam się, ja tu tylko sprzątam.",
                a2: "Ja nie brałem!",
                a3: "Ale o ssso chozzi?",
                a4: "Nie mamy pańskiej Celiki i co nam pan zrobi?!",
            },
            correctAnswer: 'a4'
        }
    },
    summary: {
        summaryText: "Koniec kłiza nareszcie!",
        resultMessages: {
            0: "Tragedia baranie!",
            25: "Ledwo-ledwo.",
            50: "Coś tam wiesz...",
            75: "Nie najgorzej!",
            99: "REWELACJA ! ! !"
        }

    }
}



const basicSample01 = {
    quizName: "Elementary Questions",
    questions: {
        q1: "How much?",
        q2: "How old are you?",
        q3: "You sure?",
    },
    answerOptions: {
        q1: {
            a1: "Very much!",
            a2: "Not much.",
            a3: "Not at all."
        },
        q2: {
            a1: "Young.",
            a2: "Old...",
            a3: "Old enough!",
        },
        q3: {
            a1: "Not really",
            a2: "Are you?",
            a3: "I am!"
        }
    },
    correctAnswers: {
        q1: ["a1"],
        q2: ["a3"],
        q3: ["a2"]
    }
}

const basicSample02 = {
    quizName: "Secondary Quiz",
    questions: {
        q1: "How long?",
        q2: "When did you?",
        q3: "Do you like?",
    },
    answerOptions: {
        q1: {
            a1: "Not very much!",
            a2: "Quite.",
            a3: "Not enough."
        },
        q2: {
            a1: "Just.",
            a2: "Long ago...",
            a3: "Not yet!",
        },
        q3: {
            a1: "No",
            a2: "And you?",
            a3: "I detest!"
        }
    },
    correctAnswers: {
        q1: ["a1"],
        q2: ["a1", "a3"],
        q3: ["a2"]
    }
}


// const quizGroups = {
//     basicQuizes: {
//         basicSample01: basicSample01,
//         basicSample02: basicSample02,
//     }
// }

const basic2 = {
    q1: "How much?",
    a1: "Very much!",
    q2: "How old are you?",
    a2: "Enough!",
    q3: "You sure?",
    a3: "I am!"
}

export {
    // quizGroups,
    quiz0001,
    basicSample01,
    basicSample02,
    basic2
}