function ok(data, message = 'OK') { return { success: true, message, data }; }
function fail(message = 'Error', details = undefined) { return { success: false, message, details }; }
module.exports = { ok, fail };
