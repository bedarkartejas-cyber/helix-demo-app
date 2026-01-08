import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../interfaces";

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
    const [recommendations, setRecommendations] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnswerSelect = (questionId: string, answerValue: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answerValue }));
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const isQuizFinished = currentQuestionIndex >= questions.length;

    useEffect(() => {
        if (isQuizFinished && Object.keys(answers).length > 0) {
            const fetchRecommendations = async () => {
                setIsLoading(true);
                try {
                    const recommendedProducts =
                        await window.electronAPI.getRecommendations(answers);
                    setRecommendations(recommendedProducts);
                } catch (error) {
                    console.error("Failed to fetch recommendations:", error);
                }
                setIsLoading(false);
            };
            fetchRecommendations();
        }
    }, [isQuizFinished, answers]);

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-10 overflow-y-auto">
            <header className="absolute top-10 left-10">
                <Link
                    to="/"
                    className="text-zinc-400 hover:text-white transition-colors"
                >
                    &larr; Back to Home
                </Link>
            </header>

            {isQuizFinished ? (
                <div className="text-center w-full max-w-5xl">
                    {isLoading ? (
                        <>
                            <h1 className="text-5xl font-light mb-4 animate-pulse">
                                Finding your match...
                            </h1>
                            <p className="text-zinc-400">
                                Analyzing your answers to find the best products
                                for you.
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-5xl font-light mb-4">
                                Here are your recommendations!
                            </h1>
                            <p className="text-zinc-400 mb-12">
                                Based on your answers, we think you'll love
                                these.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {recommendations.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group border border-zinc-800 rounded-3xl p-6 bg-zinc-950 text-left flex flex-col"
                                    >
                                        <div className="aspect-video bg-zinc-900 rounded-2xl mb-6 overflow-hidden">
                                            <div className="w-full h-full flex items-center justify-center text-zinc-500">
                                                {product.model_name} Visual
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">
                                            {product.model_name}
                                        </h3>
                                        <p className="text-zinc-400 mt-2 leading-relaxed flex-grow">
                                            {product.hero_description}
                                        </p>
                                        <button className="mt-8 w-full py-3 bg-zinc-800 text-white rounded-xl font-bold group-hover:bg-helix-student transition-colors">
                                            Explore
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="bg-zinc-900 p-6 rounded-lg text-left max-w-md mx-auto mt-16">
                        <h2 className="text-lg font-bold mb-4 text-white">
                            Your Selections Summary
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
