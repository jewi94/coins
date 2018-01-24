var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/market'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});

var testSchema = mongoose.Schema({
	name: String
});

testSchema.methods.speak = function () {
	var greeting = this.name
	? "Meow name is " + this.name
	: "I don't have a name"
	console.log("speak() - " + greeting);
}

var TestModel = mongoose.model("BTC_XMR", testSchema);

var testIns = new TestModel({ name: "BTC_XMR"});

testIns.save(function(err, testIns){
	if(err) return console.error(err);
	testIns.speak();
});

TestModel.find(function(err, models){
	if(err) return console.error(err);
	console.log("find() - "+models);
});

TestModel.find({name:/^testIns/});	