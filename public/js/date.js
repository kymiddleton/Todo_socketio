const day = "<h1>" + moment().format('ddd') + "<h1>";
const date = "<p>" + moment().format('MMM D') + "<p>" + moment().format('YYYY') + "<p>";

$('.day').append(day);
$('.date').append(date);