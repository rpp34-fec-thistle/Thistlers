import axios from 'axios';

const sortAnswers = (unsortedAnswers) => {
  return unsortedAnswers.sort((a, b) => {
    if (
      Object.values(a)[0].answerer_name === 'Seller'
      && Object.values(b)[0].answerer_name === 'Seller'
      ) {
      if (Object.values(a)[0].helpfulness > Object.values(b)[0].helpfulness) {
        return -1;
      } else {
        return 1;
      }
    } else if (
      Object.values(a)[0].answerer_name === 'Seller'
      || Object.values(a)[0].helpfulness > Object.values(b)[0].helpfulness
      ) {
      return -1;
    } else {
      return 1;
    }
  })
}

const convertAnswerObjToArray = (ansObj) => {
  return Object.entries(ansObj).map(question => {
    return {
      [question[0]]: question[1]
    }
  });
}

const sortAllData = (unsortedData) => {
  return unsortedData.map(question => {
    if (Object.keys(question.answers).length > 1) {
      const unorderedAnswers = convertAnswerObjToArray(question.answers);
      const orderedAnswers = sortAnswers(unorderedAnswers);
      question.answers = orderedAnswers;
    } else {
      question.answers = [question.answers];
    }
    return question;
  })
}


const validateEmail = (email) => {
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regex.test(email);
}

const checkLength = (input, min, max) => {
  return input.length >= min && input.length <= max;
}

export default {
  orderData: (productId, cb) => {
    axios(`/questions/${productId}`)
      .then(results => {
        const unorderedData = results.data.results;
        const orderedData = sortAllData(unorderedData);
        cb(null, orderedData);
      })
      .catch(err => {
        cb(err);
      })
  },

  validateQuestionForm: ( question, nickname, email ) => {
    const errors = [];
    if (!validateEmail(email) || !checkLength(email, 1, 60)) {
      errors.push('question-email');
    }
    if (!checkLength(nickname, 1, 60)) {
      errors.push('question-nickname');
    }
    if (!checkLength(question, 1, 1000)) {
      errors.push('question');
    }
    return errors;
  },

  validateAnswerForm: ( answer, nickname, email ) => {
    const errors = [];
    if (!validateEmail(email) || !checkLength(email, 1, 60)) {
      errors.push('answer-email');
    }
    if (!checkLength(nickname, 1, 60)) {
      errors.push('answer-nickname');
    }
    if (!checkLength(answer, 1, 1000)) {
      errors.push('answer');
    }
    return errors;
  },

  filterQuestions: (questions, searchTerm) => {
    const regex = new RegExp(searchTerm, 'ig');
    return questions.filter(question => {
      return regex.test(question.question_body);
    })
  }
}