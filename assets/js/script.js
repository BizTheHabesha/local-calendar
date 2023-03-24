// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // get the current time as an integer
  var currentTime24 = Number(dayjs().format('h'));
  // convert the current time to a 24 hour format. this makes the math later easier
  if(dayjs().format('a')[0] == 'p'){
    currentTime24+=12;
  }
  // an object initialized as empty to store the memos keyed by the corresponding hour
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
  // get both the save button and save icon and allow them to access the same function on click
  $('.saveBtn').click(saveOnClick);
  $('.fas').click(saveOnClick);
  // saves the currently typed memo for the correspodning button.
  function saveOnClick(e){
    // prevent browser default
    e.preventDefault();
    // get the target of the click as a jquery element
    var target = $(e.target);
    // will hold the div in which the target button is located
    var targetDiv;
    // check if the button or the icon was clicked, then find the div parent from that
    target.is('button') ? targetDiv = target.parent() : targetDiv = target.parent().parent();
    // set the corresponding memo from the id of the target div. we use regex to ensure we only get the number
    memos[String(targetDiv.attr('id').replace(/hour-/g, ''))] = targetDiv.children('textarea').val()
    // add this updated memos object to local storage.
    localStorage.setItem('memos', JSON.stringify(memos));
  }
  // loop through each timeblock div
  for(let timeBlock of $('.time-block')){
    // get the hour from the id of the div, using regex again to extract just the number
    var hourFromId = Number(timeBlock.id.replace(/hour-/g, ''))
    // set the text in each textarea element to its corresponding data in local storage
    $(timeBlock).children('textarea').val(JSON.parse(localStorage.getItem('memos'))[String(hourFromId)])
    // compare the time associated with each time block and compare it to the current time, all of which is
    // reformatted in a 24 scale (except on the display) to make calculations like this easier. Using this
    // we apply the corresponding styling
    if(hourFromId == currentTime24){
      timeBlock.classList.add('present')
    }else if(hourFromId < currentTime24){
      timeBlock.classList.add('past')
    }else{
      timeBlock.classList.add('future');
    }
  }
  // trigger the save buttons immediatly to grab anything set by local storage. doing this way means that even if
  // local storage doesn't contain a memos element at all, we can still grab without error.
  $('.saveBtn').trigger('click');
  // set the date at the top to the current date
  $('#currentDay').text(dayjs().format('MMM D, YYYY'));
});