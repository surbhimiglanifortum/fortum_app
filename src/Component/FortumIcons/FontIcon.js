import React, { memo} from 'react';
import {View} from 'react-native'
import { createIconSet } from 'react-native-vector-icons';
import customFontGlyph from '../../Utils/fonts/font_icon.json';
import BharatDC from "./BharatDC";
import FontIcon_ from '../../Utils/fonts/font-icon.ttf'

const FontIcon = ({ name="connector-chademo",size=36,color='black',style={} }) => {
    const Icon = createIconSet(customFontGlyph, require('../../Utils/fonts/font-icon.ttf'));

    // if(name==='connector-bharatdc'){
    //     return <BharatDC style={style} color={color} size={size}/>
    // }

    return <Icon style={style} color={color} name={name} size={size} />


};

export default memo(FontIcon);
