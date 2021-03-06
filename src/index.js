const { ONTOLOGIES } = require('./config');
const _ = require('lodash');

let data = {};
let loaded = false;

//load data from json files based on ontologies
const loadData = () => {
  if (loaded) return;
  // const start = performance.now();
  for (let ontology in ONTOLOGIES) {
    const filename = `../data/${ontology}-parsed.json`;
    const ontologyData = require(filename);
    data = {...data, ...ontologyData};
  }
  // const end = performance.now();
  // console.log(`loadData took ${end - start} milliseconds.`);
  loaded = true;
}

//get all children of a list of curies
exports.getDescendants = (curies, recursive = true) => {
  loadData();
  if (recursive) {
    //recursively get all children
    const children = _.pick(data, curies);
    const getDescendantsRecur = (curies, prop) => {
      for (let curie of curies) {
        if (data[curie]) {
          children[prop].push(...data[curie]);
          getDescendantsRecur(data[curie], prop);
        }
      }
    }
    //get children recursively for each key value of children
    for (const prop in children) {
      getDescendantsRecur(children[prop], prop);
      children[prop] = _.uniq(children[prop]);
    }
    return children;
  } else
  {
    return _.pick(data, curies);
  }
}
