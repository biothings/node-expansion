const { ONTOLOGIES } = require("./config");
const _ = require("lodash");

let data = {};
let loaded = false;

const ENTITY_CAP = 100;

//load data from json files based on ontologies
const loadData = () => {
  if (loaded) return;
  // const start = performance.now();
  for (let ontology in ONTOLOGIES) {
    const filename = `../data/${ontology}-parsed.json`;
    const ontologyData = require(filename);
    Object.entries(ontologyData).forEach(([parent, descendants]) => {
      data[parent] = { source: ontology.toUpperCase(), descendants };
    });
  }
  // const end = performance.now();
  // console.log(`loadData took ${end - start} milliseconds.`);
  loaded = true;
};

//get all children of a list of curies
exports.getDescendants = (curies, recursive = true) => {
  loadData();
  if (recursive) {
    //run level order traversal to get closest descendants
    const children = {};

    for (let curie of curies) {
      children[curie] = {};
      level = [curie];
      while (
        level.length > 0 &&
        Object.keys(children[curie]).length < ENTITY_CAP
      ) {
        next_level = [];
        for (let c of level) {
          if (data[c]) {
            data[c].descendants.forEach(
              child => (children[curie][child] = data[c].source),
            );
            next_level.push(
              ...data[c].descendants.filter(child => child !== curie),
            );
          }
        }
        level = next_level;
      }

      delete children[curie][curie]; // Ensure no self-children
      children[curie] = Object.fromEntries(
        Object.entries(children[curie]).slice(0, ENTITY_CAP),
      );
    }
    return children;
  } else {
    return Object.fromEntries(
      Object.entries(_.pick(data, curies)).map(([curie, descendantInfo]) => {
        return [
          curie,
          Object.fromEntries(
            descendantInfo.descendants
              .filter(descendant => descendant !== curie)
              .map(descendant => [descendant, source]),
          ),
        ];
      }),
    );
  }
};
