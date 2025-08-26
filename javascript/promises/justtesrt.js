const colors = {
  valami: 'color',
  megvalami: 'megegycolor',
};

for (const key in colors) {
  if (Object.prototype.hasOwnProperty.call(colors, key)) {
    const element = colors[key];
    console.log(element);
  }
}
