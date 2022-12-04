
//Declaring Components in my form:
let form = document.getElementById('insurance_form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let applicant = document.getElementsByName('applicant');
let bedrooms = document.getElementById('bedrooms');
let area = document.getElementsByName('area');
let propType = document.getElementById('prop_type');
let yearBuilt = document.getElementById('year_built');
let coverType = document.getElementById('cover_type');
let contentCover = document.getElementById('contents_cover');
let buildCover = document.getElementById('building_cover');
let claimsFree = document.getElementById('years_claims_free');
let runningTotal = document.getElementById('running_total');
// this was fund on the mozila definition for Date variables.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
let currDate = new Date(Date.now());

let helper = document.getElementById('helper');
let helperCont = document.getElementById('helper_container');
let timer = document.getElementById('timer');

let total;
let count = 240;

// Buttons:
let quote = document.getElementById('quote');

// Helper Functions:
let yearsFreeHelper = document.getElementById('years_free_help');
let yearBuiltHelper = document.getElementById('year_built_help');
let coverTypeHelper = document.getElementById('cover_type_help');
let contentsHelper = document.getElementById('conent_cover_help');


let updateTotal = function() {
  total = 0;

  //Applicant type addition.
  total += valueOfRadio(applicant);

  // price per Room
  if(isValidNumber(bedrooms)){
    total += (parseInt(bedrooms.value) * 10);
    bedrooms.style.border = "1px solid #555";
  }

  //Area type addition.
  total += valueOfRadio(area);

  // prop type value.
  total += listValueInt(propType);

  // price for year built
  if(isValidNumber(yearBuilt)){
    //check to make sure year built is less than or equal to current year
    if(parseInt(yearBuilt.value) <= currDate.getFullYear()){
          total += (currDate.getFullYear() - parseInt(yearBuilt.value))*10;
          // reset valid on change:
          yearBuilt.style.border = "1px solid #555";
    }
  }

  // cover type value.
  total += listValueInt(coverType);

  // contents cover addition.
  total += listValueInt(contentCover);
  // building cover addition.
  total += listValueInt(buildCover);

  // reduction for claimsFree;
  if (isValidNumber(claimsFree)) {
    total -= (parseInt(claimsFree.value) * 10);
    claimsFree.style.border = "1px solid #555";
  }

  if(total >= 0){
      runningTotal.value = total;
  }else{
    runningTotal.value = 0;
  }


}

function isValidNumber(test){
  let testNumber = parseInt(test.value);
  let result = false;
  // numbers are tested to be positive whole numbers.
  if (testNumber >= 0 && testNumber != null) {
    result = true;
  }
  return result;
}


// returns the value of the radio thats checked.
function valueOfRadio(radio){
  result = 0;
  for (var i = 0; i < radio.length; i++) {
    if(radio[i].checked){
      result = parseInt(radio[i].value);
    }
  }
  return result;
}

// function to check the value from the selected index.
function listValueInt(list){
  if (list.selectedIndex != -1) {
    // used this as i had list.selectedIndex.value in previously and had to test.
    //console.log("selected a diff Property" + list[list.selectedIndex].value);
    return parseInt(list[list.selectedIndex].value);
  }else {
    return 0;
  }
}

// created function for adding radios to each element of the radio buttons.
function radioAddEvent(radio){
  for (var i = 0; i < radio.length; i++) {
    radio[i].addEventListener('change', updateTotal);
  }
}

let helperOn = function(e){
        helperCont.style.display = "block";
        // used this to figure out what values for the img tag i could use for helper.
        // console.log(e.target.alt);
        helper.innerHTML = e.target.alt;
}
let helperOff = function(e){
        helperCont.style.display = "none";
}

// count down timer:
window.onload = function(){
  let countDown = setInterval('startCountdown()',1000);
}
function startCountdown() {
        if (count > 0) {
          count--;
          if (count >180) {
            timer.innerHTML = "3:" + (count -180);
          }else if (count >120) {
            timer.innerHTML = "2:" + (count -120);
          }else if (count >60) {
            timer.innerHTML = "1:" + (count -60);
          }else{
            timer.innerHTML = "0:" + (count);
          }
        }else {
          window.location.assign("timed_out.html");
        }
}


// helper function listeners:
yearsFreeHelper.addEventListener('mouseover',helperOn);
yearsFreeHelper.addEventListener('mouseout',helperOff);
yearBuiltHelper.addEventListener('mouseover',helperOn);
yearBuiltHelper.addEventListener('mouseout',helperOff);
contentsHelper.addEventListener('mouseover',helperOn);
contentsHelper.addEventListener('mouseout',helperOff);
coverTypeHelper.addEventListener('mouseover',helperOn);
coverTypeHelper.addEventListener('mouseout',helperOff);

//Event Listeners for form.
radioAddEvent(applicant);
bedrooms.addEventListener('input', updateTotal);
radioAddEvent(area);
propType.addEventListener('change', updateTotal);
yearBuilt.addEventListener('input', updateTotal);
coverType.addEventListener('change', updateTotal);
contentCover.addEventListener('change', updateTotal);
buildCover.addEventListener('change', updateTotal);
claimsFree.addEventListener('input', updateTotal);

// interupts submit for sending values to sumary page.
form.addEventListener('submit', function (e) {
        e.preventDefault();
        // validate form will highlight fields not correct.
        if(validateForm()){

          window.alert("Valid form entry! Go to summary page");
        }
      });

// validate Form only using simple validation here. (numbers already validated from above.)
function validateForm(){
  let result = true;

  if (name.value == "" || name.value == null) {
    result = false;
    name.style.border ="4px solid #b50303";
  }else{
    name.style.border = "1px solid #555";
  }
  if (email.value == "" || email.value == null) {
    result = false;
    email.style.border ="4px solid #b50303";
  }else{
    email.style.border = "1px solid #555";
  }
  if(!isValidNumber(bedrooms) || bedrooms.value == ""){
    result = false;
    bedrooms.style.border ="4px solid #b50303";
  }else{
    bedrooms.style.border = "1px solid #555";
  }
  if(!isValidNumber(yearBuilt) || yearBuilt.value == ""){
    result = false;
    yearBuilt.style.border ="4px solid #b50303";
  }else{
    yearBuilt.style.border = "1px solid #555";
  }

  if(!isValidNumber(claimsFree) || claimsFree.value == ""){
    result = false;
    claimsFree.style.border ="4px solid #b50303";
  }else{
    claimsFree.style.border = "1px solid #555";
  }

  return result;
}
