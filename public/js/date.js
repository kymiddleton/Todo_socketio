const day = moment().format('ddd');
console.log(day);
    const date = moment().format('MMM D YYYY');
    console.log(date);
    $('#header').append(day);
    $('.date').append(date);