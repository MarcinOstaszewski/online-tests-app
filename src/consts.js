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
    basicSample01,
    basicSample02,
    basic2
}