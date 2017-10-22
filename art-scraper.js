// var request = require('request');
// var cheerio = require('cheerio');

// var searchTerm = 'screen+scraping';
// var url = 'http://www.bing.com/search?q=' + searchTerm;

// request(url, function(err, resp, body){
//   $ = cheerio.load(body);
//   links = $('.sb_tlst h3 a'); //use your CSS selector here
//   $(links).each(function(i, link){
//     console.log($(link).text() + ':\n  ' + $(link).attr('href'));
//   });
// });

// var request = require('request');
// var cheerio = require('cheerio');

// var searchTerm = 'screen+scraping';
// var url = 'http://www.artistryindy.com/indianapolis-indianapolis/artistry-artistry-apartments/floorplans/edie-ecosuite-184396/is-premium-view/1/tab/0/';

//request(url, function(err, resp, body){
//  $ = cheerio.load(body);
//  links = $('div.unit-col.unit'); //use your CSS selector here
//  console.log(links)
//  $(links).each(function(i, link){
//    console.log($(link).text() + ':\n  ' + $(link).attr('href'));
//  });
//});

// let scheme = 'http://'
// let host = 'www.artistryindy.com'
// let city = 'indianapolis-indianapolis'
// let community = 'artistry-artistry-apartments'
// let floorplan = 'edie-ecosuite-184396'
// let path = `/${city}/${community}/floorplans/${floorplan}/is-premium-view/1/tab/0/`
// let uri = `${scheme}${host}${path}`

// var page = require('webpage').create();
// page.open(uri, function(status) {
//   console.log("Status: " + status);
  // if(status === "success") {
  //   page.render('example.png');
  // }
//   phantom.exit();
// });

// let phantom = require('phantom');
// (async function() {
//   let instance = await phantom.create();
//   let page = await instance.createPage();
//   await page.on('onResourceRequested', function(requestData) {
//     console.info('Requesting', requestData.url);
//   });

//   let status = await page.open(uri);
//   let content = await page.property('content')
//   .then(console.log(content));
//   await instance.exit();
// })();

// function click(el){
//   var ev = document.createEvent("MouseEvent");
//   ev.initMouseEvent(
//       "click",
//       true /* bubble */, true /* cancelable */,
//       window, null,
//       0, 0, 0, 0, /* coordinates */
//       false, false, false, false, /* modifier keys */
//       0 /*left*/, null
//   );
//   el.dispatchEvent(ev);
// }

// const modalURL = 'www.artistryindy.com/?module=check_availability&property[id]=83354&action=view_unit_spaces&property_floorplan[id]=184396&move_in_date=09/14/2017'

// var page = require('webpage').create();
// page.open(modalURL, function(status) {
//   if (status !== 'success') {
//     console.log('Unable to access network');
//     console.log(status);
//   } else {
//     console.log (req)
//   }
//   phantom.exit()
// });
