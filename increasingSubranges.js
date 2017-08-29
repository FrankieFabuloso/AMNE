
const filterInput = ( input ) =>
  input.split(' ').filter(value => value !== '').map( value => {
    const numericValue = Number(value)
    if( isNaN(numericValue) ) {
      throw `Invalid input. Value '${value}' is not a number.`
    }
    return numericValue
  })

const parseTxtIntoObject = ( inputText ) => {
  const inputAsArray = inputText.toString().split('\n')
  const sizeAndWindowInput = filterInput(inputAsArray[0])
  const homeSalePriceArray = filterInput(inputAsArray[1])
  console.log('inputAsArray:', inputAsArray)
  if( inputAsArray.length < 2 ) {
    throw 'Invalid input. Not enough arguments.'
  }
  if( sizeAndWindowInput.length < 2 ){
    throw 'Invalid input. Not enough arguments on line 1.'
  }
  if( sizeAndWindowInput[0] != homeSalePriceArray.length ) {
    throw `Given integer N: ${sizeAndWindowInput[0]} does not match with given input on line 2: ${homeSalePriceArray.length}`
  }

  const homeSalePrices = {
    'homeSalePriceArray': homeSalePriceArray,
    'kWindowSize': sizeAndWindowInput[1]
  }
  return homeSalePrices
}

const calculateTrendByTwo = ( homeSalePrices ) => {
  const { homeSalePriceArray, kWindowSize } = homeSalePrices

  const subrangeCalulation = homeSalePriceArray.reduce( (memo, value, index, array) => {
    if( array[index+1] === undefined ){
      return memo
    }

    if ( value < array[index+1] ) {
      memo.push(1)
    } else if ( value > array[index+1] ) {
      memo.push(-1)
    } else {
      memo.push(0)
    }
    return memo
  }, [] )

  return { subrangeCalulation, kWindowSize }
}

const calulateResultsPerWindowSize = ( homeSalePrices ) => {
  const { subrangeCalulation, kWindowSize } = homeSalePrices
  const foundCalculationsMemo = {}

  return subrangeCalulation.reduce( (memo, value, index, array) => {
    const subrange = array.slice(index, (index + (kWindowSize - 1) ) )

    if( subrange.length >= (kWindowSize - 1) ) {

      if( foundCalculationsMemo[subrange] === undefined ) {
        foundCalculationsMemo[subrange] = calculateWindowTrend(subrange)
      }
      memo.push( foundCalculationsMemo[subrange] )
    }
    return memo

  }, [])
}

const calculateWindowTrend = ( subrange ) => {
  let sum = 0
  let trendsArray = []

  subrange.forEach( (value, index, array) => {
    sum += value
    if( value === array[index + 1] ) {
      if( trendsArray.length === 0 ) {
        trendsArray.push( value )
      } else {
        trendsArray.push( trendsArray[trendsArray.length - 1] + value)
      }
    } else {
      trendsArray.push( 0 )
    }
  })

  return sum + trendsArray.reduce( (memo, value) => memo + value, 0 )
}

const printWindowResultsByLine = ( windowResulstArray ) => {
  windowResulstArray.forEach( value => console.log(value))
}

module.exports = {
  parseTxtIntoObject,
  calculateTrendByTwo,
  calulateResultsPerWindowSize,
  calculateWindowTrend,
  printWindowResultsByLine
}
