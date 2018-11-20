// const day = moment().format('ddd');
const day = "<h1>" + moment().format('ddd') + "<h1>";
console.log(day);

// const date = moment().format('MMM D YYYY');
const date = "<p>" + moment().format('MMM D YYYY') + "<p>";
// const date = "<p>" + moment().format('MMM D') + "<p>";
// const year = "<h2>" + moment().format('YYYY') + "<h2>";
console.log(date);
$('.day').append(day);
$('.date').append(date);
