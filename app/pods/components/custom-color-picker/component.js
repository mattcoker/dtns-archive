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
    ['#001f3f','#0074D9','#7FDBFF','#39CCCC','#3D9970'],
    ['#2ECC40','#01FF70','#FFDC00','#FF851B','#FF4136'],
    ['#F012BE','#B10DC9','#111111','#AAAAAA','#DDDDDD']
  ]
});
