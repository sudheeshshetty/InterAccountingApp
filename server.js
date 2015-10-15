var http = require('http');
var mongoose =require('mongoose');
var qs = require('querystring');
var express=require('express');
var bodyParser = require('body-parser');
var url = require('url');
var app=express();
var bank=1000000000;
var id,count;
var date;
app.use( bodyParser.json() );
app.use(express.static('./')); 
app.use(bodyParser.urlencoded({     
  extended: true
}));

mongoose.connect('mongodb://localhost/bank');
	var Schema = mongoose.Schema({
		_id:Number,
		fname:String,
		lname:String,
		sex:String,
		dob:String,
		creationDate:String,
		email:String,
		mobile:Number,
		balance:Number,
		accountType:String,
		address:String
		
});
var transaction=mongoose.Schema({
_id:Number,
AccountNumber:Number,
transactionDate:String,
Status:String

});

var accounts = mongoose.model('accounts',Schema);
var transactions = mongoose.model('transactions',transaction);

app.get('/',function(req,res){
res.redirect("./Main.html");
});

app.post('/account', function(req,res){
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
accounts.count({},function(err,c){
if(err) res.json(err);
else if(c==0) count=0;
else count=c;
id=bank+count+1;
date=new Date();
transactions.count({},function(err,c)
					{
						if(err) res.json(err);
						else if(c==0) count=0;
						else count=c;
						transaction_id=count+1;
						date=new Date();
						new transactions({
							_id:transaction_id,
							AccountNumber:id,
							transactionDate:date.toLocaleDateString(),
							Status:"Account Creation"
						}).save(function(err,doc)
						{
							if(err) res.json(err);
						});
					});
new accounts({
                _id:id,
                fname:req.body.fname,
                lname:req.body.lname,
                sex: req.body.sex,
                dob : req.body.dob,
				creationDate:date.toLocaleDateString(),
                email : req.body.email,
                mobile:req.body.mobile,
                balance:req.body.balance,
				accountType:req.body.type,
				address:req.body.address
        }).save(function(err,doc){
                if(err) res.json(err);
                else res.json({accountNumber:id});
        });

});
});

app.get('/list',function(req,res){
res.setHeader("Access-Control-Allow-Origin","*");
accounts.find({},function(err,docs){
if(err){res.json(err);}
else{res.json(docs);}
});
});

app.get('/statement',function(req,res){
var url_parts = url.parse(req.url, true);
var accountNumber=url_parts.query.account;
res.setHeader("Access-Control-Allow-Origin","*");
transactions.find({'AccountNumber':accountNumber},function(err,docs){
if(err){res.json(err);}
else {res.json(docs);}
});
});

app.get('/delete',function(req,res){
var url_parts = url.parse(req.url, true);
res.setHeader("Access-Control-Allow-Origin","*");
transactions.findByIdAndRemove({_id:url_parts.query.transactionID},function(err,docs){
if(err){res.json(err);}
else {res.send("deleted");}
});
});


app.post('/credit',function(req,res){
res.setHeader("Access-Control-Allow-Origin","*");
	accounts.find({_id:req.body.account},function(err,docs){
		if(err){ res.write("No Account with this number found");}
		else{
			var total=eval(parseInt(docs[0].balance)+parseInt(req.body.balance));
			accounts.findByIdAndUpdate({_id:req.body.account},
			{balance:total},
			function(err,docs)
			{
				if(err){ res.json(err);}
				else
				{
					transactions.count({},function(err,c)
					{
						if(err) res.json(err);
						else if(c==0) count=0;
						else count=c;
						transaction_id=count+1;
						date=new Date();
						new transactions({
							_id:transaction_id,
							AccountNumber:req.body.account,
							transactionDate:date.toLocaleDateString(),
							Status:"Credited"
						}).save(function(err,doc)
						{
							if(err) res.json(err);
						});	
						res.json({transactionid:transaction_id});
					});
				}
			});
		}
	});
});


app.post('/debit',function(req,res){
res.setHeader("Access-Control-Allow-Origin","*");
	accounts.find({_id:req.body.account},function(err,docs){
		if(err){ res.write("No Account with this number found");}
		else{
			var total=eval(parseInt(docs[0].balance)-parseInt(req.body.balance));
			if(total>0){
				accounts.findByIdAndUpdate({_id:req.body.account},
				{balance:total},
				function(err,docs)
				{
					if(err){ res.json(err);}
					else
					{
						transactions.count({},function(err,c)
						{
							if(err) res.json(err);
							else if(c==0) count=0;
							else count=c;
							transaction_id=count+1;
							date=new Date();
							new transactions({
								_id:transaction_id,
								AccountNumber:req.body.account,
								transactionDate:date.toLocaleDateString(),
								Status:"Credited"
							}).save(function(err,doc)
							{
								if(err) res.json(err);
							});	
							res.json({transactionid:transaction_id});
						});
					}
				});
			}
			else
			{res.json({transactionid:"fail"})}
		}
	});
});

app.listen(3000);
