const fs = require('fs');

const { promises } = fs;

async function listTalkers() {
  const talkers = await promises.readFile('./talker.json', 'utf-8');

  return talkers;
}

module.exports = listTalkers;
