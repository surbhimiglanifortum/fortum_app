const map = {
    "IEC_62196_T1":{name:"TYPE1",icon:"connector-type1"},
    "IEC_62196_T2_COMBO":{name:"CCS",icon:"connector-ccs"},
    "CHADEMO":{name:"CHADEMO",icon:"connector-chademo"},
    "IEC_62196_T2":{name:"TYPE2",icon:"connector-type2"},
    "IEC_62196_T1_COMBO":{name:"Bharat DC001",icon:"connector-bharatdc"},
    "DOMESTIC_F":{name:"AC 001",icon:"connector-unknown"},
}

export const getChargerMapObject = (standard) => {
    if(map.hasOwnProperty(standard)){
        return map[standard]
    }
    else {
        return {
            name:standard,
            icon:""
        }
    }
}

export const getOriginalStandardFromTitle = (title) => {
    let m = Object.values(map)
    for (let i = 0; i < m.length; i++) {
        if(m[i].name===title){
            return getKeyByValue(map,m[i])
        }
    }
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}