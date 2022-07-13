//find and download and parse
const { ONTOLOGIES } = require('./config');
const { parseFile } = require('./parser');
const fs = require('fs');
const axios = require('axios');
const shell = require('shelljs');

//iterate over ontologies obj
for (let ontology of Object.values(ONTOLOGIES)) {
  const url = ontology.url;
  console.log(`Downloading ${url}`);
  axios.get(url)
    .then(response => {
      fs.writeFileSync(`../data/${ontology.name}.owl`, response.data);
      //use shell js to run robot and convert owl to json
      shell.exec(`../robot convert -i ../data/${ontology.name}.owl --format json -o ../data/${ontology.name}.json `);
      console.log(`Parsing ${url}`);
      parseFile(`../data/${ontology.name}.json`);
      console.log(`Cleaning up ${url}`);
      shell.exec(`rm ../data/${ontology.name}.owl`);
      shell.exec(`rm ../data/${ontology.name}.json`);
    })
    .catch(error => {
      console.log(error);
    });
}
