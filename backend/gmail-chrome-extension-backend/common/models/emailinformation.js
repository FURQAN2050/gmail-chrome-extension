'use strict';
const cheerio = require('cheerio');
module.exports = function (Emailinformation) {
    // https://loopback.io/doc/en/lb3/Extend-your-API.html

    Emailinformation.parseEmailInformation = function (EmailInformationId, cb) {
        Emailinformation.findById(EmailInformationId, function (err, instance) {
            var response = "Name of coffee shop is ";
            const { htmlTemplate, id } = instance;
            const parsedTemplate = JSON.parse(htmlTemplate);
            // console.log(parsedTemplate);
            const $ = cheerio.load(parsedTemplate);
            let parseResponse = parseTemplate($);
            //console.log(parseResponse);
            parseResponse.id = id;


            Emailinformation.patchOrCreate(parseResponse, function (err, instance) {
                //console.log(instance);
                cb(null, response);
            });

        });
    }

    function parseTemplate(cheerioInstance) {
        let response = {};
        if (isTemplate1(cheerioInstance)) {
            response = parseInfoByTemplate1(cheerioInstance);
        }
        if (isTemplate2(cheerioInstance)) {
            console.log('parseTemplate2');
            response = parseInfoByTemplate2(cheerioInstance);
        }

        return response;
    }

    function isTemplate1(cheerioInstance) {
        let exists = false;
        var completeString = cheerioInstance('div').find('*')
            .contents()
            .filter(function () {
                return this.type === 'text';
            }).text();

        if (completeString.indexOf("SELF-TAPE for:") >= 0) {
            exists = true;
        }
        console.log(exists);
        return exists;
    }

    function isTemplate2(cheerioInstance) {
        let exists = false;
        var completeString = cheerioInstance('div').find('*')
            .contents()
            .filter(function () {
                return this.type === 'text';
            }).text();

        if (completeString.indexOf("Eddie Ramos") >= 0) {
            exists = true;
        }
        console.log(exists);
        return exists;
    }

    function parseInfoByTemplate1(cheerioInstance) {
        // find the particular Table
        const tableSelector = cheerioInstance('table');
        const response = getTableData(tableSelector, cheerioInstance);
        let templateSchema = getEmailInformationObjectTemplateSchema();

        for (let i in response) {

            if (i == "Project") {
                templateSchema["projectName"] = response[i];
            }
            if (i == "Client") {
                templateSchema["clientName"] = response[i];
            }
            if (i == "Date") {
                templateSchema["date"] = response[i];
            }
            if (i == "Time") {
                templateSchema["time"] = response[i];
            }
            if (i == "Casting Director") {
                templateSchema["castingDirector"] = response[i];
            }
            if (i == "Start Date") {
                templateSchema["startDate"] = response[i];
            }
            if (i == "Wrap Date") {
                templateSchema["endDate"] = response[i];
            }
            if (i == "Executive Producer") {
                templateSchema["executive"] = response[i];
            }
            if (i == "Role") {
                templateSchema["role"] = response[i];
            }
        }

        // console.log(i);
        console.log(templateSchema);
        return templateSchema;
    }

    function parseInfoByTemplate2(cheerioInstance) {
        let templateSchema = getEmailInformationObjectTemplateSchema();
        let TableSelectorObj = {
            "Casting Director": 'div > div > div:nth-child(5) > div > div:nth-child(3) > div > p:nth-child(7) > span',
            "Project": 'div > div > div:nth-child(5) > div > div:nth-child(3) > div > p:nth-child(5) > span',
            "Role": 'div > div > div:nth-child(5) > div > div:nth-child(3) > div > p:nth-child(8) > span'
        };

        for (let i in TableSelectorObj) {

            if (i == "Project") {
                let val = cheerioInstance(TableSelectorObj[i]).text();
                val = val.replace(/:/g, "").trim();
                templateSchema["projectName"] = val;
            }
            if (i == "Client") {
                templateSchema["clientName"] = TableSelectorObj[i];
            }
            if (i == "Date") {
                templateSchema["date"] = TableSelectorObj[i];
            }
            if (i == "Time") {
                templateSchema["time"] = TableSelectorObj[i];
            }
            if (i == "Casting Director") {
                let val = cheerioInstance(TableSelectorObj[i]).text();
                val = val.replace(/:/g, "").trim();
                templateSchema["castingDirector"] = val;
            }
            if (i == "Start Date") {
                templateSchema["startDate"] = TableSelectorObj[i];
            }
            if (i == "Wrap Date") {
                templateSchema["endDate"] = TableSelectorObj[i];
            }
            if (i == "Executive Producer") {
                templateSchema["executive"] = TableSelectorObj[i];
            }
            if (i == "Role") {
                let val = cheerioInstance(TableSelectorObj[i]).text();
                val = val.replace(/:/g, "").trim();
                templateSchema["role"] = val;
            }
        }

        // console.log(i);
        console.log(templateSchema);
        return templateSchema;
    }

    function getTableData(tableSelector, templateParserLib) {
        const jsonReponse = []
        const columnHeadings = []
        const options = {
            rowForHeadings: 0,  // extract th cells from this row for column headings (zero-based)
            ignoreHeadingRow: true, // Don't tread the heading row as data
            ignoreRows: [],
        }
        const rowJson = {}
        templateParserLib(tableSelector).find('tr').each((i, row) => {
            // if (options.ignoreHeadingRow && i === options.rowForHeadings) return
            // TODO: Process options.ignoreRows

            let first = 0;
            let second = 0;
            let key = '';
            let value = '';
            templateParserLib(row).find('td').each(function (j, cell) {
                let text = templateParserLib(cell).text().trim();
                text = text.replace(/Â£/g, "");
                if (first == 0) {
                    text = text.replace(/:/g, "").trim();
                    console.log({ first });
                    key = text;
                    first++;
                }
                if (second == 1) {
                    console.log({ second });
                    value = text;
                }
                if (first == 1 && second == 1) {
                    console.log('in condition');
                    rowJson[key] = value;
                    first = 0;
                    second = 0;
                    key = '';
                    value = '';
                }
                console.log({ first, second });
                second++;
            })

            // Skip blank rows
            if (JSON.stringify(rowJson) !== '{}') jsonReponse.push(rowJson)
        })
        // templateParserLib(tableSelector).each(function (i, table) {
        //     var trs = templateParserLib(table).find('tr');
        //     const alreadySeen = {}

        //     // templateParserLib(trs[options.rowForHeadings]).find('th').each(function (j, cell) {
        //     //     let tr = templateParserLib(cell).text().trim()
        //     //     // console.log(tr);
        //     //     tr = tr.replace(/:/g, "").trim();

        //     //     if (alreadySeen[tr]) {
        //     //         let suffix = ++alreadySeen[tr]
        //     //         tr = `${tr}_${suffix}`
        //     //     } else {
        //     //         alreadySeen[tr] = 1
        //     //     }

        //     //     columnHeadings.push(tr)
        //     // })

        //     // Process rows for data
        //     templateParserLib(table).find('tr').each((i, row) => {
        //         const rowJson = {}
        //         if (options.ignoreHeadingRow && i === options.rowForHeadings) return
        //         // TODO: Process options.ignoreRows

        //         templateParserLib(row).find('td').each(function (j, cell) {
        //             let text = templateParserLib(cell).text().trim()
        //             text = text.replace(/Â£/g, "");
        //             rowJson[text] = text;
        //         })

        //         // Skip blank rows
        //         if (JSON.stringify(rowJson) !== '{}') jsonReponse.push(rowJson)
        //     })
        // })
        console.log(rowJson);
        return rowJson;
    }

    function getEmailInformationObjectTemplateSchema() {
        return {
            "projectName": "",
            "clientName": "",
            "date": "",
            "time": "",
            "castingDirector": "",
            "startDate": "",
            "endDate": "",
            "executive": "",
            "role": ""
        }
    }

    Emailinformation.remoteMethod(
        'parseEmailInformation', {
        http: { path: '/parseEmailInformation', verb: 'get' },
        accepts: { arg: 'id', type: 'number', required: true, http: { source: 'query' } },
        returns: {
            arg: 'name',
            type: 'string'
        }
    }
    );
};
