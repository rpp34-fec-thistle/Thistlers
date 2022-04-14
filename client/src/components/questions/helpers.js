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
  }
}
