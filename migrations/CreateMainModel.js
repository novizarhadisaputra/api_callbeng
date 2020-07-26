const mongoose = require('mongoose');
const db = mongoose.connection;
const Role = mongoose.model('Role');

function mainCreate() {
	createRoleModel();
}

async function createRoleModel() {
	const counting = await Role.countDocuments({}).exec();
	if (!counting) {
		Role.insertMany([ { name: 'Developer' }, { name: 'Admin' }, { name: 'Technician' }, { name: 'Customer' } ])
			.then(function() {
				console.log('Data role model inserted'); // Success
			})
			.catch(function(error) {
				console.log(error); // Failure
			});
	}
}

module.exports = {
	mainCreate: mainCreate()
};
