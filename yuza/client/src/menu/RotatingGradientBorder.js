import React from 'react';

// 레벨별 색상은 여기서 수정하면 됨
const defaultGradients = {
  0: ['#ff0000', '#ff3333'],
  1: ['#ff6600', '#ff9933'],
  2: ['#ffff00', '#ffff66'],
  3: ['#00ff00', '#66ff66'],
  4: ['#0000ff', '#3333ff'],
  5: ['#000080', '#0000b3'],
  6: ['#800080', '#b300b3'],
  7: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3']
};

// level은 level={userLevel}로 받고
const RotatingGradientBorder = ({ level, size = 66, gradients = defaultGradients }) => {
  const colors = gradients[level] || gradients[0];

  return (
    <svg width={size} height={size} viewBox="0 0 66 66">
      <defs>
        <linearGradient id={`gradient-${level}`} gradientTransform="rotate(0)">
          {colors.map((color, index) => (
            <stop
              key={index}
              offset={`${(index / (colors.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
      </defs>
      <circle
        cx="33"
        cy="33"
        r="31.5"
        fill="none"
        stroke={`url(#gradient-${level})`}
        strokeWidth="3"
      />
    </svg>
  );
};

export default RotatingGradientBorder;