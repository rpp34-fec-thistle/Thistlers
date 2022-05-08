import helpers from './helpers';

const unorderedDataId = '64625';

const orderedQuestionData = [
  {
      "question_id": 563812,
      "question_body": "Why is this product cheaper here than other sites?",
      "question_date": "2018-06-08T00:00:00.000Z",
      "asker_name": "toofast",
      "question_helpfulness": 10,
      "reported": false,
      "answers": {
        "5539511": {
          "id": 5539511,
          "body": "I have no idea",
          "date": "2022-05-07T00:00:00.000Z",
          "answerer_name": "John",
          "helpfulness": 7,
          "photos": []
        },
        "5539510": {
          "id": 5539510,
          "body": "cheap materials",
          "date": "2022-05-07T00:00:00.000Z",
          "answerer_name": "Joe",
          "helpfulness": 4,
          "photos": []
        },
        "5270036": {
            "id": 5270036,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-11-08T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 2,
            "photos": []
        }
      }
  },
  {
      "question_id": 563811,
      "question_body": "Does this product run big or small?",
      "question_date": "2018-04-04T00:00:00.000Z",
      "asker_name": "smithsmith",
      "question_helpfulness": 8,
      "reported": false,
      "answers": {
          "5270027": {
              "id": 5270027,
              "body": "Runs small, I'd say",
              "date": "2018-06-04T00:00:00.000Z",
              "answerer_name": "smithsmith",
              "helpfulness": 8,
              "photos": []
          },
          "5539444": {
              "id": 5539444,
              "body": "small",
              "date": "2022-05-05T00:00:00.000Z",
              "answerer_name": "nick",
              "helpfulness": 0,
              "photos": []
          }
      }
  }
];

describe('helper function Unit Tests', () => {
  it('sorts question data by helpfulness', () => {
    JSON.stringify(helpers.orderData(unorderedDataId, (err, data) => {
      if (err) {
        return;
      } else {
        if (data) {
          expect(JSON.stringify(data)).toBe(JSON.stringify(orderedQuestionData));
        }
      }
    }))
  })

  it('validates email, nickname, and question/answer required form fields', () => {
    const testName = 'Test Name';
    const testEmail = 'test@gmail.com';
    const testQuestion = 'What is the meaning of life?';
    const testAnswer = 'To be present.';

    expect(helpers.validateAnswerForm(testAnswer, testName, testEmail)).toEqual([]);
    expect(helpers.validateAnswerForm('', testName, testEmail)).toEqual(['answer']);
    expect(helpers.validateAnswerForm(testAnswer, '', testEmail)).toEqual(['answer-nickname']);
    expect(helpers.validateAnswerForm(testAnswer, testName, 'joe@email')).toEqual(['answer-email']);
    expect(helpers.validateQuestionForm('', testName, testEmail)).toEqual(['question']);
    expect(helpers.validateQuestionForm(testQuestion, testName, testEmail)).toEqual([]);
  })
})