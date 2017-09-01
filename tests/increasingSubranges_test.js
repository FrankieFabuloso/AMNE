const { expect } = require('chai');
const {
  parseTxtIntoObject,
  calculateTrendByTwo,
  calulateResultsPerWindowSize,
  calculateWindowTrend,
  printWindowResultsByLine } = require('../increasingSubranges.js')


describe( 'parseTxtIntoObject()', () => {
  it( 'exists', () => {
    expect(parseTxtIntoObject).to.be.a('function')
  })

  describe( 'creates an object of a files contents', () => {
    const fileContents = parseTxtIntoObject( '5 3\n1 2 3 4 5')

    it( 'returns an object', () => {
      expect(fileContents).to.be.a('object')
    })

    it( 'contains two keys', () => {
      expect(Object.keys(fileContents).length).equal(2)
    })

    it( 'contains desired window size of caluculation trend', () => {
      expect(fileContents.kWindowSize).equal(3)
    })

    it( 'object contains K window size', () => {
      expect( fileContents.kWindowSize ).equal( 3 )
    })

    it( 'object contains array of average home sale data of length N', () => {
      expect( fileContents.homeSalePrices.length ).equal(5)
      expect( fileContents.homeSalePrices ).deep.equal([1,2,3,4,5])
    })
  })
})


describe( 'calculateTrendByTwo()', () => {
  it( 'exists', () => {
    expect(calculateTrendByTwo).to.be.a('function')
  })

  describe( 'Calulates the trend over N months by a window size of 2', () => {
    const homeSalePriceData = {
      'homeSalePrices': [1, 2, 3, 4, 5],
      'kWindowSize': 3
    }
    const windowSizeOfTwo = calculateTrendByTwo(homeSalePriceData)

    it( 'returns an object with two keys', () => {
      expect( Object.keys(windowSizeOfTwo).length ).equal(2)
    })

    it( 'returns array of caculated trends of two', () => {
      expect( windowSizeOfTwo.subrangeCalulation ).deep.equal( [1,1,1,1] )
    })
  })
})

describe( 'calulateResultsPerWindowSize()', () => {
  it( 'exists', () => {
    expect(calulateResultsPerWindowSize).to.be.a('function')
  })

  describe( 'Calucates average home sale price trend by K window size', () => {
    const homeSalePriceData =  {
      subrangeCalulation: [1, 1, 1, 1],
      'kWindowSize': 3
    }
    const homeSaleTrendsByK = calulateResultsPerWindowSize(homeSalePriceData)

    it( 'Returns array of calulated trends by window size K', () => {
      expect( homeSaleTrendsByK ).deep.equal([3,3,3])
    })
  })
})

describe( 'calculateWindowTrend()', () => {
  it( 'exists', () => {

    expect(calculateWindowTrend).to.be.a('function')
  })

  it( 'given a reduced subrange, returns the number of increasing subranges within the window minus the number of decreasing subranges within the window.', () => {

    expect( calculateWindowTrend([1, 1, 1]) ).equal(6)
    expect( calculateWindowTrend( [0, 1, -1, 1, 1, 1, -1, -1] ) ).equal( 3 )
  })
})
