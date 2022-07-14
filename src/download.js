//find and download and parse
const { ONTOLOGIES } = require('./config');
const { parseFile } = require('./parser');
const fs = require('fs');
const { https }  = require('follow-redirects');
const axios = require('axios');
const shell = require('shelljs');

const download = () => {
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
};

if (!fs.existsSync('../robot.jar')) {
  console.log('Downloading robot.jar file...');
  let url = 'https://github.com/ontodev/robot/releases/download/v1.9.0/robot.jar';
  let dest = '../robot.jar';
  let file = fs.createWriteStream(dest);
  let request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      console.log('Downloaded robot.jar file');
      file.close();  // close() is async, call cb after close completes.
      download();
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
  });
} else {
  download();
}
