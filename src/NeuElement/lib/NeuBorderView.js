import React from 'react';
import NeuView from './NeuView';


const NeuBorderView = props => {
  const {
    color,
    width = 100,
    height = 100,
    borderRadius,
    borderWidth = 10,
    children,
    containerStyle,
    customLightShadow,
    customDarkShadow,
    customInsetLightShadow,
    customInsetDarkShadow,
    style
  } = props;
  return (
    <NeuView
      color={color}
      width={width}
      height={height}
      borderRadius={borderRadius}
      style={style}
      customDarkShadow={customDarkShadow}
      customLightShadow={customLightShadow}
    >
      <NeuView
        inset
        color={color}
        width={width - borderWidth}
        height={height - borderWidth}
        borderRadius={borderRadius}
        containerStyle={containerStyle}
        customInsetDarkShadow={{
          offsetX: -1,
          offsetY: -1,
          ...customInsetDarkShadow
        }}
        customInsetLightShadow={{
          offsetX: 1,
          offsetY: 1,
          ...customInsetLightShadow
        }}
      >
        {children}
      </NeuView>
    </NeuView>
  );
};

export default NeuBorderView;
