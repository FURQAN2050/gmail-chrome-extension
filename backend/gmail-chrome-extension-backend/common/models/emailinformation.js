'use strict';
const cheerio = require('cheerio');
module.exports = function (Emailinformation) {
    // https://loopback.io/doc/en/lb3/Extend-your-API.html

    Emailinformation.parseEmailInformation = function (EmailInformationId, cb) {
        Emailinformation.findById(EmailInformationId, function (err, instance) {
            var response = "Name of coffee shop is ";
            const { htmlTemplate } = instance;
            const parsedTemplate = JSON.parse(htmlTemplate);
            // console.log(parsedTemplate);
            const $ = cheerio.load(parsedTemplate);
            checkTemplate($);

            cb(null, response);
        });
    }

    function checkTemplate(cheerioInstance) {
        if (isTemplate1(cheerioInstance)) {
            parseInfoByTemplate1(cheerioInstance);
        }
    }

    function isTemplate1(cheerioInstance) {
        // console.log(cheerioInstance('a').find('SELF-TAPE for'));
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

    function parseInfoByTemplate1(cheerioInstance) {
        // find the particular Table
        const tableSelector = cheerioInstance('table');
        const response = getTableData(tableSelector, cheerioInstance);
        // console.log(response);

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
                text = text.replace(/:/g, "").trim();
                text = text.replace(/Â£/g, "");
                if (first == 0) {
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
        return jsonReponse;
    }

    // Emailinformation.status = function (cb) {
    //     var response = null;
    //     var data = Emailinformation.findById('2').then(res => {
    //         console.log(res);
    //     });
    //     console.log(data);
    //     cb(null, response);
    // }

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
