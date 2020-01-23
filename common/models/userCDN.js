'use strict';

module.exports = function(UserCDN) {
  UserCDN.validatesUniquenessOf('username', {message: 'username is not unique'});
};
