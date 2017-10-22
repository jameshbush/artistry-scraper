const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');
const cmd=require('node-cmd');

const outwardFacing = (n) => Number(n) % 2 !== 0
const topFloor = (n) => n[0] === '5'
const consoleLogReport = (unitNums) => {
  if (!unitNums) throw 'No unitNums'

  const desirableRooms = unitNums
    .filter(topFloor)
    .filter(outwardFacing)
  const topFloorRooms = unitNums
    .filter(topFloor)
  const outwardFacingRooms = unitNums
    .filter(outwardFacing)

  console.log(
    [
      `Rooms: ${unitNums.join(', ')}`,
      `5th floor outward facing rooms: ${desirableRooms}`,
      `5th floor rooms: ${topFloorRooms}`,
      `Outward facing rooms: ${outwardFacingRooms}`
    ].join("\n")
  )
}

class modalParser {
  constructor({ filePath, reportingStrategy }) {
    this.filePath = filePath;
    this.reportingStrategy = reportingStrategy;
  }

  parseModal() {
    fs.readFile(this.filePath, 'utf-8', (err, content) => {
      if (!content) throw `File "${this.filePath}" not found`

      const $ = cheerio.load(content);
      const unitNumElements = $('.unit-col.unit .unit-col-text')
      const unitNums = unitNumElements
          .text()
          .match(/.{1,3}/g) // split in 3 char substrings
          .sort()

      this.reportingStrategy(unitNums)
    });
  }
}

reporterFactory = () => {
  if (process.env.USER === 'JB') {
    return consoleLogReport;
  }
  // else if (process.argv[2] === 'consoleLog') {
  //   return consoleLogReport;
  // }
}

parse = () => {
  const parser = new modalParser({
    filePath: './modals_html/edie.html',
    reportingStrategy: reporterFactory(),
  })
  parser.parseModal()
}

(function curlReportToSys() {
  if (process.argv[2] === 'curl') {
    cmd.get(
      `curl -g -H "Accept: application/html" -H "Content-Type: application/html" -X GET "www.artistryindy.com/?module=check_availability&property[id]=83354&action=view_unit_spaces&property_floorplan[id]=184396" > ./modals_html/edie.html`,
      parse,
    )
  } else {
    parse()
  }
})();

// http.get(createRequestObject(), (res) => {
//   if (res.statusCode !== 200)
//     return console.log('http response error')
//   res.setEncoding('utf8');

//   let chunks = [];
//   res.on('data', (chunk) => {
//     chunks.push(chunk);
//   })
//   .on('success', _ => {console.log(chunks.join(''))})
// })

// function createRequestObject() {
//   const edieId = '184396'
//   const jacqId = '157692'
//   const today = () => {
//     const date = new Date();
//     const dd = date.getDate();
//     const mm = date.getMonth()+1; //January is 0!
//     const yyyy = date.getFullYear();
//     const twoDigetDate = (date) => {
//       let dateStr = String(date)
//       if (dateStr.length < 2)
//         dateStr = `0${dateStr}`;

//       return dateStr;
//     }

//     return [dd, mm, yyyy].map(twoDigetDate).join('/');
//   }

//   return {
//     hostname: 'www.artistryindy.com',
//     port: 80,
//     method: 'GET',
//     path: `/?module=check_availability&property[id]=83354&action=view_unit_spaces&property_floorplan[id]=${edieId}&move_in_date=${today()}`,
//     path: `/?module=check_availability&property[id]=83354&action=view_unit_spaces&property_floorplan[id]=${jacqId}&move_in_date=${today()}`,
//     agent: false
//   }
// };