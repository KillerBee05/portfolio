const axios = require('axios');

function get(url) {
    axios.get(url)
    .then(response => {
        // console.log(response.data);
        var people = response.data.results;
        // people.forEach((x) => {console.log(`${people[x].name} / ${people[x].birth_year}`);})
        for(i in people) {
            console.log(`${people[i].name} / ${people[i].birth_year}`);
        }
        var next = response.data.next;

        if(next !== null) {
            get(next)
        }

    })
    .catch(error => {
        console.log(error);
    });
}

get('https://swapi.dev/api/people/')
