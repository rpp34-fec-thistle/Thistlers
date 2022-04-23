
const formatDate = dateString => {
  let dateArr = dateString.split('-');
  const monthRelation = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  var month = monthRelation[dateArr[1]];
  var day = dateArr[2].slice(0, 2);
  var year = dateArr[0];

  return (month + " " + day + ", " + year); 
};

const prettifyName = (name) => {
  var nameString = name.toLowerCase();
  var firstChar = nameString[0].toUpperCase();
  return (firstChar + nameString.slice(1));
};

export {formatDate, prettifyName};