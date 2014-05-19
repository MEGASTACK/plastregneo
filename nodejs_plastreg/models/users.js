var _ = require('underscore'),
	keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Users
 * =====
 */

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: false }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone' },
	isPlastRegUser: { type: Boolean, label: "Regular PlastReg User"}
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

//Provide access to PlastReg stuff
User.schema.virtual('canAccessPlastReg').get(function() {
	return this.isPlastRegUser;
});


/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
