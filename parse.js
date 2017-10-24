const cmd = require('node-cmd');

const CheckAvailabilityTableParser = require('./CheckAvailabilityTableParser');
const ReportFactory = require('./ReportFactory');

edieParser = () => {
  return new CheckAvailabilityTableParser({
    filePath: './modals_html/edie.html',
    reportingStrategy: ReportFactory(),
  })
}

(function curlToSys(callback) {
  if (process.argv[2] === 'curl') {
    let command = `curl -g \
      -H "Accept: application/html" \
      -H "Content-Type: application/html" \
      -X GET "www.artistryindy.com/?module=check_availability&property[id]=83354&action=view_unit_spaces&property_floorplan[id]=184396" \
    > ./modals_html/edie.html`;

    cmd.get(command, callback);
  } else {
    callback();
  }
})(edieParser);
