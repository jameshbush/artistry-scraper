const mailgun = require('mailgun.js');
const cmd = require('node-cmd');

const consoleLogReport = (content) => {
  console.log(content);
};

const emailReport = (content) => {
  var mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere',
  });

  cmd.get(
    `curl -s --user 'api:key-3d1a8e444a6546768ed3f072c4770832' \
      https://api.mailgun.net/v3/sandbox872d5518654c45bfb6c145e6dc2bc058.mailgun.org/messages \
        -F from='Mailgun Sandbox <postmaster@sandbox872d5518654c45bfb6c145e6dc2bc058.mailgun.org>' \
        -F to='James <jamesbvsh@gmail.com>' \
        -F subject='Parse complete!' \
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
