export default `
  uniform float opacity;
  uniform float isText;
  varying vec3 vNormal;
  varying vec3 vColor;
  
  void main() {
    
    const float ambient = 0.4;
    vec3 finalColor;

    vec3 light = vec3( 1.0 );
    light = normalize( light );

    float directional = max( dot( vNormal, light ), 0.0 );

    if (isText == 1.0
      && (vNormal == vec3(0.0, 0.0, 1.0) || vNormal == vec3(0.0, 0.0, -1.0))
    ) {
      finalColor = vec3( 0.9, 0.9, 0.9 );
    } else {
      finalColor = vColor;
    };

    gl_FragColor = vec4( ( directional + ambient ) * finalColor, opacity );

  }
`;
