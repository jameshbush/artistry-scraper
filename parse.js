const cmd = require('node-cmd');

const CheckAvailabilityTableParser = require('./CheckAvailabilityTableParser')

const consoleLogReport = (content) => console.log(content)

const reporterFactory = () => {
  if (process.argv[3] === 'log')
    return consoleLogReport;
  // else if (process.env.USER === 'JB')
  //   return consoleLogReport;
  else
    throw 'No reporting method selected'
}

edieParser = () => {
  new CheckAvailabilityTableParser({
    filePath: './modals_html/edie.html',
    reportingStrategy: reporterFactory(),
  })
}

(function curlReportToSys() {
  if (process.argv[2] === 'curl') {
    cmd.get(
      `curl -g -H "Accept: application/html" -H "Content-Type: application/html" -X GET "www.artistryindy.com/?module=check_availability&property[id]=83354&action=view_unit_spaces&property_floorplan[id]=184396" > ./modals_html/edie.html`,
      edieParser,
    )
  } else {
    edieParser()
  }
})();
