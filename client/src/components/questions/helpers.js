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
  },

  addToLocalStorage: (type, id) => {
    const liked = window.localStorage.getItem(`liked${type}`);
    if (liked) {
      const likedObj = JSON.parse(liked);
      if (!likedObj.includes(id)) {
        likedObj.push(id);
        window.localStorage.setItem(`liked${type}`, JSON.stringify(likedObj));
      }
    } else {
      window.localStorage.setItem(`liked${type}`, JSON.stringify([id]));
    }
  },

  checkLocalStorage: (type, id) => {
    const liked = window.localStorage.getItem(`liked${type}`);
    if (liked) {
      if (JSON.parse(liked).includes(id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  getProductName: (id, cb) => {
    axios(`/products/${id}`)
    .then(data => {
      cb(null, data);
    })
    .catch(err => {
      cb(err);
    })
  }
}



