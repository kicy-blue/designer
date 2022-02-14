
module.exports = {
  'port': 8020,
  'proxy': {
    'futurebox': {
      'target': 'http://192.168.12.11:8001',
      'changeOrigin': true
    },
    '/mock': {
      'target': 'http://localhost:6300',
      'changeOrigin': true,
      'pathRewrite': {
        'mock': ''
      }
    }
  },
  'host': 'localhost'
}