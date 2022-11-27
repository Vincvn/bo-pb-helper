'use strict'
export class PocketBaseHelper {
    constructor() {
        this._and = []
        this._or = []
    }
    $op(field, data){
        if(field.toString() === '$and'){
            return `(${new PocketBaseHelper().find(data)})`
        }
        if(field.toString() === '$or'){
            return `(${new PocketBaseHelper().$or(data)})`
        }
        if (typeof data === 'object'){
            const key = Object.keys(data)[0];
            const val = data[key];
            switch (key.toString()){
                case "$eq":
                    return `${field} = '${val}'`
                case "$ne":
                    return `${field} != '${val}'`
                case "$gt":
                    return `${field} > '${val}'`
                case "$gte":
                    return `${field} >= '${val}'`
                case "$lt":
                    return `${field} < '${val}'`
                case "$lte":
                    return `${field} <= '${val}'`
                case "$like":
                    return `${field} ~ '%${val}%'`
                case "$not_like":
                    return `${field} !~ '%${val}%'`
                case "$start":
                    return `${field} ~ '${val}%'`
                case "$nsw":
                    return `${field} !~ '${val}%'`
                case "$end":
                    return `${field} ~ '%${val}'`
                case "$not_end":
                    return `${field} !~ '%${val}'`
            }
        }
        return `${field}='${data}`
    }
    find(props){
        const $q = this
        Object.keys(props).map(function(field){
            if(props[field] !== null && props[field] !== undefined) $q._and.push($q.$op(field, props[field]))
        })
        return this._and.join(' && ').trim()
    }
    $or(props){
        const $q = this
        Object.keys(props).map(function(field){
            if(props[field] !== null && props[field] !== undefined) $q._or.push($q.$op(field, props[field]))
        })
        return this._or.join(' || ').trim()
    }
}