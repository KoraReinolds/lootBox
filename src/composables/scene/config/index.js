import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import fontSMTH from '@/assets/fonts/Ruslan_Display_Regular.typeface.json';

const textHeight = 40;
const textParams = {
  font: new FontLoader().parse(fontSMTH),
  curveSegments: 4,
  height: 10,
  size: 35,
  bevelThickness: 2,
  bevelSize: 1.5,
};

export default {
  textHeight,
  textParams,
};
