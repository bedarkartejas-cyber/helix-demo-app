import React, { useState } from "react";
import { Link } from "react-router-dom";

const questions = [
    {
        id: "persona",
        question: "What will you be doing most on your new laptop?",
        options: [
            { text: "Crushing the latest games", value: "gaming" },
            {
                text: "Editing 4K video or designing graphics",
                value: "creator",
            },
            {
                text: "Managing business tasks and video calls",
                value: "office",
            },
            { text: "Attending lectures and writing papers", value: "student" },
        ],
    },
    {
        id: "mobility",
        question: "Where does your work happen?",
        options: [
            {
                text: "Mostly at a desk (I need maximum screen size and power)",
                value: "desktop",
            },
            {
                text: "On the go (I need something thin, light, and portable)",
                value: "portable",
            },
        ],
    },
    {
        id: "workload",
        question: "How many things are you usually doing at once?",
        options: [
            {
                text: "Just the essentials (Web browsing, emails, streaming)",
                value: "essentials",
            },
            {
                text: "Heavy multitasking (Multiple apps, dozens of tabs, large files)",
                value: "multitasking",
            },
        ],
    },
    {
        id: "feature",
        question: "Is there a specific feature you can't live without?",
        options: [
            {
                text: "A screen that looks incredible (OLED/Touch)",
                value: "display",
            },
            { text: "Battery that lasts all day and night", value: "battery" },
            {
                text: "Advanced security and privacy features",
                value: "security",
            },
        ],
    },
];

export default function Questionnaire() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const handleAnswerSelect = (questionId: string, answerValue: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answerValue }));
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const isQuizFinished = currentQuestionIndex >= questions.length;
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-10">
            <header className="absolute top-10 left-10">
                <Link
                    to="/"
                    className="text-zinc-400 hover:text-white transition-colors"
                >
                    &larr; Back to Home
                </Link>
            </header>

            {isQuizFinished ? (
                <div className="text-center">
                    <h1 className="text-5xl font-light mb-4">Thank You!</h1>
                    <p className="text-zinc-400 mb-8">
                        Based on your answers, we'll find the perfect match.
                    </p>
                    <div className="bg-zinc-900 p-6 rounded-lg text-left max-w-md mx-auto">
                        <h2 className="text-lg font-bold mb-4">
                            Your Selections:
                        </h2>
                        <ul className="space-y-2">
                            {Object.entries(answers).map(([key, value]) => (
                                <li key={key} className="flex justify-between">
                                    <span className="capitalize text-zinc-400">
                                        {key}:
                                    </span>
                                    <span className="font-mono text-helix-student">
                                        {value}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-3xl text-center">
                    <p className="text-helix-student font-bold uppercase tracking-widest text-sm mb-4">
                        Question {currentQuestionIndex + 1} of{" "}
                        {questions.length}
                    </p>
                    <h1 className="text-4xl md:text-5xl font-light leading-tight mb-12">
                        {currentQuestion.question}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() =>
                                    handleAnswerSelect(
                                        currentQuestion.id,
                                        option.value
                                    )
                                }
                                className="p-8 border border-zinc-800 rounded-2xl text-left hover:bg-zinc-900 hover:border-zinc-700 transition-all"
                            >
                                <span className="text-lg">{option.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
