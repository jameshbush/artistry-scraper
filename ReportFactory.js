const consoleLogReport = (content) => console.log(content)

const ReporterFactory = () => {
  if (process.argv[3] === 'log')
    return consoleLogReport;
  else
    throw 'No reporting method selected'
}

module.exports = ReporterFactory;
