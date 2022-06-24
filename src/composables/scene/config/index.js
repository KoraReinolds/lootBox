import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import fontSMTH from '@/assets/fonts/Ruslan_Display_Regular.typeface.json';

const cameraDistance = 170;
const textDistance = 100;
const textHeight = 10;
const modelXRotation = Math.PI / 6;
const modelYRotation = Math.PI / 5;
const textParams = {
  font: new FontLoader().parse(fontSMTH),
  curveSegments: 4,
  height: 5,
  size: 10,
  bevelThickness: 0.1,
  bevelSize: 0.5,
};

export default {
  cameraDistance,
  textDistance,
  textHeight,
  textParams,
  modelXRotation,
  modelYRotation,
};
