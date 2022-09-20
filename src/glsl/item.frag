// uniform float rate;
// uniform float rate2;
// uniform float time;
// uniform float circle;
// uniform vec3 color;
// uniform vec3 color2;
// uniform vec2 center;

// varying vec2 vUv;


// void main(void) {
//   float d = distance(vUv, center);
//   float a = mix(step(rate, d), 1.0 - step(rate, d), circle);
//   if(a <= 0.01) {
//     discard;
//   }
//   // gl_FragColor = vec4(mix(color, color2, step(rate + sin(vUv.x * 100.1 + time * 0.01) * 0.1, d)), a);
//   gl_FragColor = vec4(mix(color, color2, step(rate2, d)), a);
// }

// #pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform float rate;
uniform float time;
uniform vec3 color;
uniform vec3 color2;
uniform vec2 center;

varying vec2 vUv;


void main(void) {
  vec2 n = sin(time * 0.1 + vec2(vUv.xy * vec2(2.1, -1.8) * 10.0)) * 0.025;

  float d = distance(vUv, center + n);
  // float d = distance(vUv, center);
  float a2 = (1.0 - step(rate, d * 3.5));
  float a =  a2;
  if(a <= 0.01) {
    discard;
  }

  gl_FragColor = vec4(mix(color, color2, step(rate, d)), 1.0);
}
