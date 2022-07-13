const { ONTOLOGIES } = require('./config');
const _ = require('lodash');

let data = {};
let loaded = false;

//load data from json files based on ontologies
const loadData = () => {
  if (loaded) return;
  const start = performance.now();
  for (let ontology in ONTOLOGIES) {
    const filename = `../data/${ontology}-parsed.json`;
    const ontologyData = require(filename);
    data = {...data, ...ontologyData};
  }
  const end = performance.now();
  console.log(`loadData took ${end - start} milliseconds.`);
  loaded = true;
}

//get all children of a list of curies
exports.getChildren = (curies) => {
  loadData();
  return _.pick(data, curies);
}
