const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');

const outwardFacing = (n) => Number(n) % 2 !== 0
const topFloor = (n) => n[0] === '5'

fs.readFile('./modals_html/edie.html', 'utf-8', (err, content) => {
  if (!content)
    return console.log('no file')

  const $ = cheerio.load(content);
  const unitNums =
     $('.unit-col.unit .unit-col-text') // unit number table column
      .text()
      .match(/.{1,3}/g) // split into 3 char substrings
      .sort()

  const desirableRooms = unitNums
    .filter(topFloor)
    .filter(outwardFacing)

  console.log(
    `Rooms: ${unitNums.join(', ')}`,
    `\n5th floor outward facing rooms: ${desirableRooms}`,
    `\n5th floor rooms: ${unitNums.filter(topFloor)}`,
    `\nOutward facing rooms: ${unitNums.filter(outwardFacing)}`)
})



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