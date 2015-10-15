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
		  var doc="</br><span class='filter'><label>Filter</label><select  name='filter' id='filter'>"+
					"<option value='select' selected='selected'>--select--</option>"+
  					"<option value='nameasc'>Name Ascending</option>"+
  					"<option value='namedesc'>Name Descending</option>"+
  					"<option value='date'>Creation Date</option>"+
				"</select></span></br></br><table border='1'><tr><td>Sr.No</td><td>Account Number</td><td>Name</td><td>Created On</td></tr>";
		  for(var i=0;i<obj.length;i++)
		  {
			  doc += '<tr class="select" onclick="populate(\''+obj[i]._id+'\',\''+obj[i].fname+'\',\''+obj[i].lname+'\',\''+obj[i].email+'\',\''+obj[i].mobile+'\',\''+obj[i].balance+'\');"><td>'+(i+1)+'</td><td>'+obj[i]._id+'</td>';
			  doc += '<td>'+obj[i].fname+" "+obj[i].lname+'</td><td>'+obj[i].creationDate+'</td></tr>';
		  }
		  doc+="</table>";
	      document.getElementById("initial").innerHTML=doc;
	    }
	};
	xmlHttp.open( "GET", "http://localhost:3000/list", false );
	xmlHttp.send();
}


/*function list(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	    	var doc="";
		 obj=JSON.parse(xmlHttp.responseText);
		  document.getElementById("initial").style.display="block";
		  document.getElementById("register").style.display="none";
		  doc += '</br></br></br><table border="1"><tr><td>Sr.No</td><td>Account Number</td><td>Name</td></tr>';
		  for(var i=0;i<obj.length;i++)
		  {
			  doc += '<tr onclick="javascript:showRow(this);"><td id="select">'+(i+1)+'</td>';
			  doc += '<td>'+obj[i]._id+'</td>';
			  doc += '<td>'+obj[i].fname+" "+obj[i].lname+'</a></td></tr>';
		  }
		  
		  doc += '</table>';
	      document.getElementById("initial").innerHTML=doc;
		 // document.getElementsByTagName("tr").onclick=function(){
		//		alert(this.innerHTML);
	    //	  var idValue= this.innerHTML;
		//	  alert(idValue);
	    //	  var index=idValue-1;
	    //	  populate(obj[index]._id,obj[index].fname,obj[index].lname,obj[index].email,obj[index].mobile,obj[index].balance);
	   //   }
	     // document.getElementById("select").onclick=function(){
	    //	  var idValue= this.innerHTML;
		//	  alert(idValue);
	    //	  var index=idValue-1;
	    //	  populate(obj[index]._id,obj[index].fname,obj[index].lname,obj[index].email,obj[index].mobile,obj[index].balance);
	    //  }
	   //   var idValue=document.getElementById("select").innerHTML;
	      
	    }
	}
	xmlHttp.open( "GET", "http://localhost:3000/list", false );
	xmlHttp.send();
}

function showRow(row)
{
var x=row.cells;
alert(x[0].innerHTML);
var idValue= x[0].innerHTML;
			  alert("From"+idValue);
	    	  var index=idValue-1;
 populate(obj[index]._id,obj[index].fname,obj[index].lname,obj[index].email,obj[index].mobile,obj[index].balance);
}*/
function populate(account,fname,lname,email,mobile,balance){
	var doc='<form id="formcreddeb" class="form" method="post">'+
	'<h1 class="form reg" align="center">Details</h1>'+
	'<fieldset class="form field">'+
		'<dl>'+
		'<dt><label>Account Number</label>'+
		'<dd><span id="account" name="account">'+account+'</span></dd>'+
		'<dt><label>Name</label>'+
		'<dd><span id="name" name="nam">'+fname+' '+lname+'</span></dd>'+
		'<dt><label>Email</label></dt>'+
		'<dd><span id="email" name="email">'+email+'</span></dd>'+
		'<dt><label>Mobile</label></dt>'+
		'<dd><span id="mobile" name="mobile">'+mobile+'</span></dd>'+
		'<dt><label>Total Balance</label></dt>'+
		'<dd><span id="balance" name="balance">'+balance+'</span></dd>'+
		'<div id="bal" name="bal" style="display:none;"><dt><label>Enter Balance</label></dt>'+
		'<dd><input type="number" id="transbal" name="transbal"/></dd></div>'+
		'</dl>'+
		'<div id="transfer"><input class= "online" type="button" id="credit" name="credit" value="Credit" onclick="balance(\'debit\')">'+
		'<input type="button" class="online" id="debit" name="debit" value="Debit" onclick="balance(\'credit\')">'+
		'<input type="button" class="online" id="statement" value="Statement" onclick="statements()"></div>'+
		
	  '</fieldset>'+
	'</form>';
	document.getElementById("initial").innerHTML=doc
}

function statements(){
	var account=document.getElementById("account").innerHTML;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		  var obj=JSON.parse(xmlHttp.responseText);
		  document.getElementById("initial").style.display="block";
		  document.getElementById("register").style.display="none";
		  var doc="</br></br></br><table border='1'><tr><td>Sr.No</td><td>Account Number</td><td>Status</td><td>Transaction Date</td></tr>";
		  for(var i=0;i<obj.length;i++)
		  {
			doc+="<tr><td>"+(i+1)+"</td><td>"+obj[i].AccountNumber+"</td><td>"+obj[i].Status+"</td><td>"+obj[i].transactionDate+"</td></tr>";
		  }
		  doc+="</table>";
	      document.getElementById("initial").innerHTML=doc;
		}
	}
	xmlHttp.open( "GET", "http://localhost:3000/statement?account="+account, false );
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//var params="account="+account;
	xmlHttp.send();
}

function balance(val){
	document.getElementById("bal").style.display="block";
	document.getElementById(val).style.display="none";
	//alert(document.getElementById("transbal").value);
	var c;
	if(val=="debit")
	c="Crediting";
	else
	c="debiting";
	if(document.getElementById("transbal").value!="")
	{
		document.getElementById("bal").innerHTML='<dt><label>'+c+' Balance</label></dt><dd><span id="transbal" name="transbal">'+document.getElementById("transbal").value+'</span></dd>';
		document.getElementById("transfer").innerHTML='<input class= "online" type="button" id="confirm" name="confirm" value="Confirm" onclick="transact(\''+val+'\')"/>'+
		'<input type="button" class="online" id="cancel" name="cancel" value="Cancel" onclick="list()">';
	}
	//document.getElementById("debit").style.display="none";
	//document.getElementByID("transfer").innerHTML='<input type="button" class="online" id="trans" name="trans" value="'+val+'" onclick="transact('+val+')"/>'
	//var val=this.value;
	//document.getElementById("button").innerHTML='<input class= "online" type="number" id="creditbal" name="creditbal"><input class= "online" type="button" id="credit" name="credit" value="'+val+'" onclick=""/>;
}

function transact(val){

	var account=document.getElementById("account").innerHTML;
	var balance=document.getElementById("transbal").innerHTML;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	    	
		  var obj=JSON.parse(xmlHttp.responseText);
		  document.getElementById("initial").style.display="block";
		  document.getElementById("register").style.display="none";
		  if(val=="debit")
			document.getElementById("initial").innerHTML="Account has been credited successfully. Transaction Number is " + obj.transactionid;
		  else
			if(obj.transactionid=="fail")
				document.getElementById("initial").innerHTML="Not enough Balance";
			else
				document.getElementById("initial").innerHTML="Account has been debited successfully. Transaction Number is " + obj.transactionid;
	      
	    }
	};
	
	if(val=="debit"){
		xmlHttp.open( "POST", "http://localhost:3000/credit", false );
	}
	else
	{
		xmlHttp.open( "POST", "http://localhost:3000/debit", false );
	}
	var params="account="+account+"&balance="+balance;
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.send(params);
}

