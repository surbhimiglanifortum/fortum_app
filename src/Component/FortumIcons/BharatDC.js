import React, { memo, useState, useEffect } from 'react';
import { createIconSet } from 'react-native-vector-icons';

const BharatDC = ({size,color='black',style={}}) => {
    const Icon = createIconSet({
        "connector-bharatdc": 59648,
    }, 'icomoon', require('../../Utils/fonts/FortumIndia.ttf'));
    return <Icon style={style} color={color} name={"connector-bharatdc"} size={size} />

};

export default memo(BharatDC);
