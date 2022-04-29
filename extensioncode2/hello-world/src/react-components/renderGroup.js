import React from 'react';
function renderGroups() {
    const data = getData() || [];
    let groupsDataDiv = [];
    for (let i = 0; i < data.length; i++) {
        let group = data[i].group.name;
        groupsDataDiv.push(<div>{{ group }}</div>);
    }
    return groupsDataDiv;
}

async function getData() {
    console.log('before await')
    const response = await fetch('https://chrome.myprojectstaging.com:3000/api/groups?filter=%7B%22where%22%3A%20%7B%22enduserId%22%3A%221%22%7D%2C%22include%22%3A%5B%22emails%22%5D%7D');
    console.log('after await');
    console.log(response.body);
    let data = await response.json()
    return data;
}

export {
    renderGroups
}