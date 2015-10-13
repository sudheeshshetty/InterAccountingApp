function register(){
	document.getElementById("initial").style.display="none";
	document.getElementById("register").style.display="block";
	
}
function senddata(){
	var fname=document.getElementById("fname").value;
	var lname=document.getElementById("lname").value;
	var gender=document.getElementByName("sex").value;
	var dob=document.getElementById("dob").value;
	var email=document.getElementById("email").value;
	var mobile=document.getElementById("mobile").value;
	var type=document.getElementById("accountType").value;
	var balance=document.getElementById("balance");
	var address=String(document.getElementById("add1"))+String(document.getElementById("add2"));
}

function validate(){
	x=document.getElementById("accountType").value;
	if(x=="select")
	{
		document.getElementById("error").setAttribute("style","background-color:red;color:yellow;")
		document.getElementById("error").innerHTML="Please select Account Type";
	}
	
}