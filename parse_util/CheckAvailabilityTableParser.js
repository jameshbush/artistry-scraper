const cheerio = require('cheerio');
const fs = require('fs');
const cmd = require('node-cmd')

class CheckAvailabilityTableParser {
  constructor({ filePath, reportingStrategy }) {
    this.filePath = filePath;
    this.reportingStrategy = reportingStrategy;
    this.parseModal();
  };

  outwardFacing(n) {return Number(n) % 2 !== 0};
  topFloor(n) {return n[0] === '5'};

  parseModal() {
    fs.readFile(this.filePath, 'utf-8', (err, content) => {
      if (err) throw `Cannot ${err.syscall} ${err.path}`;
      if (!content) throw 'No content found';

      const $ = cheerio.load(content);

      const available = $('.unit-col.unit .unit-col-text')
        .text()
        .match(/.{1,3}/g) // split into 3 char substrings
        .sort();

      const best = available
        .filter(this.topFloor)
        .filter(this.outwardFacing)

      const topFloor = available
        .filter(this.topFloor)

      const outwardFacing = available
        .filter(this.outwardFacing)

      this.rooms = {
        available,
        best,
        topFloor,
        outwardFacing,
      };

      this.reportingStrategy(this.rooms);
    });
  };

}

module.exports = CheckAvailabilityTableParser;
