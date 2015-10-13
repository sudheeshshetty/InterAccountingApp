function register(){
	document.getElementById("initial").style.display="none";
	document.getElementById("register").style.display="block";
	document.getElementById("fname").value='';
	document.getElementById("fname").setAttribute("placeholder","Firstname");
	document.getElementById("lname").value='';
	document.getElementById("lname").setAttribute("placeholder","Lastname");
	document.getElementById("sex").value='';
	document.getElementById("dob").value='';
	document.getElementById("email").value='';
	document.getElementById("email").setAttribute("placeholder","example@domain.com");
	document.getElementById("mobile").value='';
	document.getElementById("mobile").setAttribute("placeholder","countrycode+number");
	document.getElementById("accountType").value='';
	document.getElementById("balance").value='';
	document.getElementById("add1").value='';
	document.getElementById("add1").setAttribute("placeholder","Address Line 1");
	document.getElementById("add2").value='';
	document.getElementById("add2").setAttribute("placeholder","Address Line 2");
	
	
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
		  obj=JSON.parse(xmlHttp.responseText);
		  document.getElementById("initial").style.display="block";
		  document.getElementById("register").style.display="none";
	      document.getElementById("initial").innerHTML="Account has been created successfully. Account Number is " + obj.accountNumber;
	    }
	}
    xmlHttp.open( "POST", "http://localhost:3000/account", false );
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var param="fname="+fname+"&lname="+lname+"&sex="+gender+"&dob="+dob+"&email="+email+"&mobile="+Number(mobile)+"&type="+type+"&balance="+Number(balance)+"&address="+address;
	xmlHttp.send(param);
}

function validate(){
	x=document.getElementById("accountType").value;
	if(x=="select")
	{
		document.getElementById("error").setAttribute("style","background-color:red;color:yellow;")
		document.getElementById("error").innerHTML="Please select Account Type";
	}
	
}

function list(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		  var obj=JSON.parse(xmlHttp.responseText);
		  document.getElementById("initial").style.display="block";
		  document.getElementById("register").style.display="none";
		  var doc="</br></br></br><table border='1'><tr><td>Sr.No</td><td>Account Number</td><td>Name</td></tr>";
		  for(var i=0;i<obj.length;i++)
		  {
			  doc+="<tr><td>"+(i+1)+"<td><a class='select'  onclick='populate("+obj[i].fname+","+obj[i].lname+","+obj[i].email+","+obj[i].mobile+","+obj[i].balance+")'>"+obj[i]._id+"<a></td><td><a class='select'  onclick='populate("+obj[i]+")'>"+obj[i].fname+" "+obj[i].lname+"</a></td></tr>";
		  }
		  doc+="</table>";
	      document.getElementById("initial").innerHTML=doc;
	    }
	}
	xmlHttp.open( "GET", "http://localhost:3000/list", false );
	xmlHttp.send();
}

function populate(fname,lname,email,mobile,balance){
	alert(fname,lname,email,mobile,balance);
//	var doc='<form id="register" class="form" method="post">'+
//	'<h1 class="form reg" align="center">Details</h1>'+
//	'<fieldset class="form field">'+
//		'<dl>'+
//		'<dt><label>Name</label>'+
//		'<dd><span id="name" name="nam">'+obj.fname+' '+obj.lname+'</span></dd>'+
//		'<dt><label>Email</label></dt>'+
//		'<dd><span id="email" name="email">'+obj.email+'</span></dd>'+
//		'<dt><label>Mobile</label></dt>'+
//		'<dd><span id="mobile" name="mobile">'+obj.mobile+'</span></dd>'+
//		'<dt><label>Balance</label></dt>'+
//		'<dd><span id="balance" name="balance">'+obj.balance+'</span></dd>';		
//		'</dl>'+
//		'<input type="button" class="form credit" id="credit" name="credit" value="Credit">'+
//		'<input type="button" class="form debit" id="debit" name="debit" value="Debit">'+
//	  '</fieldset>'+
//	'</form>';
//	document.getElementById("initial").innerHTML=doc;
}