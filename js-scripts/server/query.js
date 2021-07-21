const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate a Token from the "Tokens Tab" in the UI
const token = '1ETU3JyH-if50k0mxP4okFQuoCWNjQl51QVzjT5hOADOVhyqHvB3xK1DWjgUULFZFEcXrx7utfCwx1Tb79rwEA=='
const org = 'bjumper'
const bucket = 'bjumper-bucket'

const client = new InfluxDB({url: 'http://localhost:8086', token: token})

const queryApi = client.getQueryApi(org)

const query = `from(bucket: "${bucket}") |> range(start: -1y, stop: -10s)|> filter(fn: (r) => r["_measurement"] == "amqp_consumer") |> filter(fn: (r) => r["_field"] == "value") |> filter(fn: (r) => r["host"] == "me-telegraf-1") |> last()`


queryApi.queryRows(query, {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row);
    console.log(
        `${o._time}`
    );
    console.log(
        `${o._measurement} `
    );
    console.log(
        `${o._field}=${o._value}`
      );
  },
  error(error) {
    console.error(error, error.toString())
    console.log('\nFinished ERROR')
  },
  complete() {
    console.log('\nFinished SUCCESS')
  },
});
