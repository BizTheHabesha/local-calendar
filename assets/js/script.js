// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  var timeBlockEls = $('.time-block');
  var currentTime24 = Number(dayjs().format('h'));
  if(dayjs().format('a')[0] == 'p'){
    currentTime24+=12;
  }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var memos = {
    9: '',
    10: '',
    11: '',
    12: '',
    13: '',
    14: '',
    15: '',
    16: '',
    17: '',
  };
  $('.saveBtn').click(saveOnClick);
  $('.fas').click(saveOnClick);
  function saveOnClick(e){
    e.preventDefault();
    var target = $(e.target);
    var targetDiv;
    target.is('button') ? targetDiv = target.parent() : targetDiv = target.parent().parent();
    memos[String(targetDiv.attr('id').replace(/hour-/g, ''))] = targetDiv.children('textarea').val()
    localStorage.setItem('memos', JSON.stringify(memos));
    console.log(memos);
  }
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  for(let timeBlock of timeBlockEls){
    var hourFromId = Number(timeBlock.id.replace(/hour-/g, ''))
    $(timeBlock).children('textarea').val(JSON.parse(localStorage.getItem('memos'))[String($(timeBlock).attr('id').replace(/hour-/g, ''))])
    if(hourFromId == currentTime24){
      timeBlock.classList.add('present')
    }else if(hourFromId < currentTime24){
      timeBlock.classList.add('past')
    }else{
      timeBlock.classList.add('future');
    }
  }
  $('.saveBtn').trigger('click');
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(dayjs().format('MMM D, YYYY'));
});