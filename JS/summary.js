let summary = document.getElementById('insurance_details');

let quoteArray = localStorage.getItem('your_quote') ? JSON.parse(localStorage.getItem('your_quote')) : [];

if(quoteArray.length == 12){
  let quote = `<p>Your Details: <br>
  Your Name: ${quoteArray[0]}<br>Your Emal: ${quoteArray[1]} <br>`;

  if(quoteArray[2] == '50'){
    quote += "You are a Tenant";
  }else{
    quote += "You are the property Owner";
  }

  quote += `</p><p>Property Details: <br>`;

  if(quoteArray[4] == '50'){
    quote += " Your Property is in Dublin.";
  }else{
    quote += " Your Property is Outside of Dublin."
  }

  quote += `<br>Your Property is a ${quoteArray[5]}, has ${quoteArray[3]} Bedrooms
  and It was built in the Year ${quoteArray[6]}
  </p><p>Cover Details:<br>
  The cover type selected is ${quoteArray[7]}.<br>With ${quoteArray[8]} conents cover
  & ${quoteArray[9]} building cover.
  <br>With ${quoteArray[10]} years claims free bonus.</p>
  <h4>The total cost of home insurance is €${quoteArray[11]}.</h4>`;

summary.innerHTML = quote;

}else{
  // if array length is not correct:
  summary.innerHTML = "<h3 class='invalid_quote'>Sorry your quote is invalid please <a href='index.html'>click here</a> to go back</h3>";
}
