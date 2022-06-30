'use strict';

module.exports = function (app) {
    const numModels = Object.keys(app.models).length;
    for (let dataSource of Object.values(app.dataSources)) {
        dataSource.setMaxListeners(numModels);
    }
    var ds = app.dataSources.db;

    ds.autoupdate('email', function (err) {
        if (err) throw err;
        console.log("email Table Created")
    });

    ds.autoupdate('enduser', function (err) {
        if (err) throw err;
        console.log("enduser Table Created")
    });

    ds.autoupdate('group', function (err) {
        if (err) throw err;
        console.log("group Table Created")
    });

    ds.autoupdate('groupemail', function (err) {
        if (err) throw err;
        console.log("groupemail Table Created")
    });

    ds.autoupdate('template', function (err) {
        if (err) throw err;
        console.log("template Table Created")
    });
    ds.autoupdate('grouptemplate', function (err) {
        if (err) throw err;
        console.log("grouptemplate Table Created")
    });
    // ds.autoupdate('recipt', function (err) {
    //     if (err) throw err;
    //     console.log("recipt Table Created")
    // });
};