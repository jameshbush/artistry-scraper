const cheerio = require('cheerio');
const fs = require('fs');

const outwardFacing = (n) => (Number(n) % 2 !== 0);
const topFloor = (n) => (n[0] === '5');

class CheckAvailabilityTableParser {
  constructor({ filePath, reportingStrategy }) {
    this.filePath = filePath;
    this.reportingStrategy = reportingStrategy;
    this.parseModal(); // (callback sets $, unitNums, desirableRooms, reportContent)
  };

  parseModal() {
    fs.readFile(this.filePath, 'utf-8', (err, content) => {
      if (err) throw `Cannot ${err.syscall} ${err.path}`;
      if (!content) throw `No content found`;

      this.$ = cheerio.load(content);

      this.unitNums = this.$('.unit-col.unit .unit-col-text')
          .text()
          .match(/.{1,3}/g) // split into 3 char substrings
          .sort();

      this.desirableRooms = {
        bestRooms: (
          this.unitNums
            .filter(topFloor)
            .filter(outwardFacing)
          ),
        topFloorRooms: (
          this.unitNums
            .filter(topFloor)
        ),
        outwardFacingRooms: (
          this.unitNums
            .filter(outwardFacing)
        ),
      };

      this.setReportContent();
      this.reportingStrategy(this.reportContent);
    });
  };

  setReportContent() {
    if (this.unitNums && this.desirableRooms) {
      this.reportContent = [
        `Rooms: ${this.unitNums.join(', ')}`,
        `5th floor outward facing rooms: ${this.desirableRooms.bestRooms}`,
        `5th floor rooms: ${this.desirableRooms.topFloorRooms}`,
        `Outward facing rooms: ${this.desirableRooms.outwardFacingRooms}`,
      ]
        .join("\n");
    } else {
      this.reportContent = 'Error parsing desirable rooms from unit numbers';
    }
  }
}

module.exports = CheckAvailabilityTableParser;
