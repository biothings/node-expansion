exports.ONTOLOGIES = {
  'doid': {
    'name': 'doid',
    'url': 'http://purl.obolibrary.org/obo/doid.owl'
  },
  'go': {
    'name': 'go',
    'url': 'http://purl.obolibrary.org/obo/go.owl'
  }
}

exports.CHILD_RELATIONS = {
  'is_a': true,
  // 'http://purl.obolibrary.org/obo/BFO_0000050': true, // part of
}

exports.PARENT_RELATIONS = {
  'http://purl.obolibrary.org/obo/BFO_0000051': true, // has part
}
