import { mapValues, isString, isNumber, isArray, isNull, isBoolean, isObject, isDate } from 'lodash'

function firestoreMap(data) {
  return mapValues(data, v => {
    if (isString(v)) return { stringValue: v }
    if (isNumber(v)) return { integerValue: v }
    if (isNull(v)) return { nullValue: v }
    if (isDate(v)) return { timestampValue: v }
    if (isBoolean(v)) return { booleanValue: v }
    if (isObject(v)) return { mapValue: { fields: firestoreMap(v) } }
    if (isArray(v)) return { arrayValue: { values: firestoreMap(v) } }
    return { stringValue: 'UNABLE TO MAP VALUE' }
  })
}

export default ({ app }, inject) => {
  inject('firestoreMap', data => firestoreMap(data))
}
