const cmd = require('node-cmd');

const consoleLogReport = (rooms) => {
  console.log(makeFullReport(rooms));
};

const emailReport = (rooms) => {
  const { best } = rooms;
  const { MAILGUN_API_KEY, MAILGUN_MAILING_LIST } = process.env;
  if (best.length === 0) return;

  cmd.get(
    `curl -s --user 'api:${MAILGUN_API_KEY}' \
      https://api.mailgun.net/v3/sandbox872d5518654c45bfb6c145e6dc2bc058.mailgun.org/messages \
        -F from='atristryScraper@gmail.com>' \
        -F to='${MAILGUN_MAILING_LIST}' \
        -F subject='The Best Room Ever!' \
        -F text="${best.join(', ')}"`,

    (err, data, stderr) => {
      console.log('EMAIL STATUS')
      err && console.log('\nerr:', err)
      data && console.log('\ndata:', data)
      stderr && console.log('\nstderr:', stderr)
    }
  )
}

const ReporterFactory = () => {
  if (process.argv[3] === 'log')
    return consoleLogReport;
  else if (process.argv[3] === 'email')
    return emailReport;
  else
    throw 'No reporting method selected';
}

function makeFullReport(rooms) {
  console.log(rooms)
  if (rooms.available && rooms.best) {
    return [
      `Rooms: [${rooms.available.join(', ')}]`,
      `Best rooms: [${rooms.best.join(', ')}]`,
      `5th floor rooms: [${rooms.topFloor.join(', ')}]`,
      `Outward facing rooms: [${rooms.outwardFacing.join(', ')}]`,
    ]
      .join('\n\n');
  } else {
    return 'Error parsing desirable rooms from unit numbers';
  }
}

module.exports = ReporterFactory;
