const cmd = require('node-cmd');

const consoleLogReport = (content) => {
  console.log(content);
};

const emailReport = (content) => {
  cmd.get(
    `curl -s --user 'api:${process.env.MAILGUN_API_KEY}' \
      https://api.mailgun.net/v3/sandbox872d5518654c45bfb6c145e6dc2bc058.mailgun.org/messages \
        -F from='Mailgun Sandbox <postmaster@sandbox872d5518654c45bfb6c145e6dc2bc058.mailgun.org>' \
        -F to='${process.env.MAILGUN_MAILING_LIST}' \
        -F subject='Parse Complete!' \
        -F text="${content}"`,

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

module.exports = ReporterFactory;
