var keystone = require('keystone'), 
	Types = keystone.Field.Types;

var Person = new keystone.List('Person');

/* initial: true makes the field show in the admin UI */
Person.add({ 
	fname: { label: "First Name",  type: String, required: true, initial: true},
	lname: { label: "Last Name", type: String, required: true, initial: true},
	address: { type: Types.Location, required: false, initial: true},
	email: { type: Types.Email, displayGravatar: false, initial:true}
	});


/* Hack to get lat/long to 0,0 while Google API key not working */
Person.schema.pre('save', function(next) {  
		this.address.geo = [0, 0]; 
		next();
	});

Person.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});


Person.defaultColumns = 'fname, lname, address, email'
Person.register();

	
