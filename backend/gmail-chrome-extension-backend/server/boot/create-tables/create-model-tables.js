'use strict';

module.exports = function (app) {
    var ds = app.dataSources.db;
    ds.automigrate(['User', 'ACL', 'RoleMapping', 'Role', "AccessToken"], function (err) {
        if (err) throw err;
    });
};
