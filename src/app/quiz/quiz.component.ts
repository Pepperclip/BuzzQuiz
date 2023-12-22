import { Component } from '@angular/core';

type question = {
  question: string;
  options: quizOption[];
  selectedOption: quizOption | null;
};

type quizOption = {
  name: string;
  value: number;
}

type quiz = {
  questions: question[];
  results: quizResult[];
};

type quizResult = {
  name: string;
  value: number;
  img?: string;
};

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  result: {
    quizResult: quizResult | null;
    percentage: number | null;
  } | undefined

  quiz: quiz = {
    questions: [
      {
        question: 'What is your favorite city?',
        options: [
          { name: 'London', value: 2 },
          { name: 'New York', value: 1 },
          { name: 'Paris', value: 3 },
          { name: 'Tokyo', value: 4 },
        ],
        selectedOption: null
      },
      {
        question: 'What is your favorite color?',
        options: [
          { name: 'Red', value: 1 },
          { name: 'Blue', value: 2 },
          { name: 'Green', value: 3 },
          { name: 'Yellow', value: 4 },
        ],
        selectedOption: null
      },
      {
        question: 'What is your favorite food?',
        options: [
          { name: 'Pizza', value: 1 },
          { name: 'Pasta', value: 2 },
          { name: 'Burger', value: 3 },
          { name: 'Salad', value: 4 },
        ],
        selectedOption: null
      },
      {
        question: 'What is your favorite animal?',
        options: [
          { name: 'Dog', value: 1 },
          { name: 'Cat', value: 2 },
          { name: 'Horse', value: 3 },
          { name: 'Bird', value: 4 },
        ],
        selectedOption: null
      },
      {
        question: 'What is your favorite sport?',
        options: [
          { name: 'Football', value: 1 },
          { name: 'Basketball', value: 2 },
          { name: 'Tennis', value: 3 },
          { name: 'Golf', value: 4 },
        ],
        selectedOption: null
      }
    ],
    results: [
      { name: 'Han Solo', value: 4 },
      { name: 'Luke Skywalker', value: 6 },
      { name: 'Princess Leia', value: 7 },
      { name: 'Darth Vader', value: 10 },
      { name: 'Yoda', value: 12 },
      { name: 'Obi-Wan Kenobi', value: 16 },
    ]
  };

  checkIfEnded(opt: quizOption) {
    const allAnswered = this.quiz.questions.every(q => q.selectedOption !== null);
    if (allAnswered) {
      this.calculateResult();
    }
  }
  calculateResult() {

    debugger;
    const score: number = this.quiz.questions.reduce((a, q) => a + (q.selectedOption?.value || 0), 0);

    const closestToScore = this.quiz.results.reduce((prev, result) => {
      if (Math.abs(result.value - score) < Math.abs(prev.value - score)) {
        return result;
      }
      return prev;
    }
    );

    const percentage = Math.round((score / closestToScore.value) * 100);

    this.result = {
      quizResult: closestToScore,
      percentage: percentage > 100 ? 100 : percentage,
    }
  }
}
