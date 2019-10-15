const regex = /(^|[^\\]){{(.*?(^|[^\\]))}}/g

function evaluateField(fields, key, rawValue) {
  if(typeof rawValue !== 'string') return rawValue
  return rawValue.replace(regex, (match, precedingCharacter, text) => precedingCharacter + fields[text])
}

class Evaluator {
  constructor(fields, key, rawValue) {
    this.fields= fields
    this.key = key
    this.rawValue = rawValue
  }

  evaluate() {
    if(typeof(this.value) !== 'undefined') return this.value
    if(this.evaluationStarted) {
      throw new Error(`Infinite Loop detected trying to access property ${this.key}`)
    }
    this.evaluationStarted = true
    this.value = evaluateField(this.fields, this.key, this.rawValue)
    return this.value
  }
}

const placeholder = evaluate({})

function evaluate(fields) {

  let container
  container = function(rawValue) { 
    return evaluateField(container, null, rawValue)
  }

  return Object.keys(fields).reduce((acc, k) => {
    const evaluator = new Evaluator(acc, k, fields[k])
    Object.defineProperty(acc, k, {
      get: () => evaluator.evaluate(),
      enumerable: true
    })
    return acc
  }, container)
}

export default {
  evaluate, placeholder
}