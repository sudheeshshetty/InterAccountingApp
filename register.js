function register(){
	document.getElementById("initial").style.display="none";
	document.getElementById("register").style.display="block";
	
}
function senddata(){
	var fname=document.getElementById("fname").value;
	var lname=document.getElementById("lname").value;
	var gender=document.getElementById("sex").value;
	var dob=document.getElementById("dob").value;
	var email=document.getElementById("email").value;
	var mobile=document.getElementById("mobile").value;
	var type=document.getElementById("accountType").value;
	var balance=document.getElementById("balance").value;
	var address=String(document.getElementById("add1").value)+'  '+ String(document.getElementById("add2").value);	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		  obj=JSON.parse(xmlHttp.responseText)
	      document.getElementById("register").innerHTML="Account has been created successfully. Account Number is " + obj.accountNumber;
	    }
	}
    xmlHttp.open( "POST", "http://localhost:3000/account", false );
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var param="fname="+fname+"&lname="+lname+"&sex="+gender+"&dob="+dob+"&email="+email+"&mobile="+Number(mobile)+"&type="+type+"&balance="+Number(balance)+"&address="+address;
	xmlHttp.send(param);
   /* xmlHttp.send({fname:fname,
	lname:lname,
	sex:gender,
	dob:dob,
	email:email,
	mobile:mobile,
	type:type,
	balance:balance,
	address:address});    */
}

function validate(){
	x=document.getElementById("accountType").value;
	if(x=="select")
	{
		document.getElementById("error").setAttribute("style","background-color:red;color:yellow;")
		document.getElementById("error").innerHTML="Please select Account Type";
	}
	
}