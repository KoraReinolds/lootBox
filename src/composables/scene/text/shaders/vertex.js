export default `
  uniform float amplitude;
  uniform vec3 uColor;

  attribute vec3 customColor;
  attribute vec3 displacement;

  varying vec3 vNormal;
  varying vec3 vColor;

  void main() {

    vNormal = normal;
    vColor = uColor;

    vec3 newPosition = position + normal * amplitude * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

  }
`;
