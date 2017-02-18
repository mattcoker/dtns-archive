import SpectrumColorPickerComponent from 'ember-spectrum-color-picker/components/spectrum-color-picker';

export default SpectrumColorPickerComponent.extend({
  showPaletteOnly: true,
  togglePaletteOnly: true,
  hideAfterPaletteSelect: true,
  flatMode: true,
  preferredFormat: 'hex',
  showInitial: true,
  clickoutFiresChange: true,

  palette: [
    ['#282940', '#5CA57D', '#F06153', '#F0AE2C', '#1B5A7A'],
    ['#9869AA', '#7ACFE6', '#7e7d79', '#FCFBE4', '#9D3978'],
    ['#FFABE5', '#379956', '#8C0909', '#F73859', '#F7D098']
  ]
});
