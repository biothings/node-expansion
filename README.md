# Node Expansion

Module for expanding terms to children.

## Install

```
npm i @biothings-explorer/node-expansion
```

## Usage

- by default, the module will expand terms to all children

```js
const { getChildren } = require('@biothings-explorer/node-expansion');

console.log(getChildren(['GO:0022010', 'DOID:0060524']));

// {
//   'DOID:0060524': [
//     'DOID:0040001',
//     'DOID:0060526',
//     'DOID:0060525',
//     'DOID:0060527',
//     'DOID:0060528',
//     'DOID:0060529'
//   ]
// }
```

 - use `recursive=false` to get direct children only
```js
const { getChildren } = require('@biothings-explorer/node-expansion');

console.log(getChildren(['GO:0022010', 'DOID:0060524', 'DOID:4'], recursive=false));

// {
//   'DOID:0060524': [ 'DOID:0040001', 'DOID:0060526' ],
//   'DOID:4': [
//     'DOID:0014667',
//     'DOID:0050117',
//     'DOID:0080015',
//     'DOID:14566',
//     'DOID:150',
//     'DOID:225',
//     'DOID:630',
//     'DOID:7'
//   ]
// }
```


### Update Data Files
```
node download.js
```
