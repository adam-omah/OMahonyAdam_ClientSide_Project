
//Declaring Components in my form:
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

let total;

// Buttons:
let quote = document.getElementById('quote');

// Helper Functions:
let yearsFreeHelper = document.getElementById('years_free_help');


let updateTotal = function() {
  total = 0;

  //Applicant type addition.
  total += valueOfRadio(applicant);

  // price per Room
  if(isValidNumber(bedrooms)){
    total += (parseInt(bedrooms.value) * 10);
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

  if (testNumber >= 0) {
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

yearsFreeHelper.addEventListener('mouseover',helperOn);
yearsFreeHelper.addEventListener('mouseout',helperOff);

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
