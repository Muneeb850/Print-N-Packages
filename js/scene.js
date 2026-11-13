/* Hero background: living pastel gradient (WebGL shader) — powder blue, lavender, peach.
   Falls back to the CSS gradient if WebGL is unavailable. */
(() => {
  const canvas = document.querySelector('canvas[data-scene]');
  if (!canvas || !window.THREE) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const T = THREE;
  let renderer;
  try { renderer = new T.WebGLRenderer({ canvas, antialias: false, alpha: false }); } catch (e) { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));

  const scene = new T.Scene();
  const cam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const col = (h) => new T.Color(h);
  const u = {
    uTime: { value: 0 }, uRes: { value: new T.Vector2(1, 1) }, uScroll: { value: 0 },
    cA: { value: col(0xb7d3ef) }, cB: { value: col(0xdcd6f2) }, cC: { value: col(0xffb996) }, cBg: { value: col(0xf7f5fc) },
  };
  const mat = new T.ShaderMaterial({
    uniforms: u,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime, uScroll; uniform vec2 uRes;
      uniform vec3 cA, cB, cC, cBg;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
      float fbm(vec2 p){ float v = 0., a = .5; for(int i=0;i<4;i++){ v += a*noise(p); p *= 2.02; a *= .5; } return v; }
      void main(){
        vec2 uv = vUv; float ar = uRes.x / uRes.y;
        vec2 p = (uv - .5) * vec2(ar, 1.);
        float t = uTime * .06;
        // domain-warped flow
        vec2 q = vec2(fbm(p*1.4 + t), fbm(p*1.4 - t + 3.7));
        vec2 r = vec2(fbm(p*1.6 + 2.*q + vec2(1.7, 9.2) + t*1.3), fbm(p*1.6 + 2.*q + vec2(8.3, 2.8) - t));
        float f = fbm(p*1.2 + 2.2*r + uScroll*.15);
        vec3 c = mix(cA, cB, smoothstep(.15, .6, f));
        c = mix(c, cC, smoothstep(.5, .95, f + p.x*.25 - p.y*.15));
        c = mix(c, cBg, smoothstep(.55, 1.1, length(p + vec2(.1, -.25)) * .6 + (1.-f)*.35) * .55);
        // paper grain
        c += (hash(uv * uRes + uTime) - .5) * .018;
        gl_FragColor = vec4(c, 1.);
      }`,
  });
  scene.add(new T.Mesh(new T.PlaneGeometry(2, 2), mat));

  function resize() {
    const r = canvas.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    u.uRes.value.set(r.width, r.height);
  }
  addEventListener('resize', resize); resize();

  let sy = 0; addEventListener('scroll', () => { sy = scrollY / innerHeight; }, { passive: true });
  let visible = true;
  new IntersectionObserver((e) => { visible = e[0].isIntersecting; }).observe(canvas);

  const clock = new T.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    u.uTime.value = clock.getElapsedTime();
    u.uScroll.value += (sy - u.uScroll.value) * .08;
    renderer.render(scene, cam);
  })();
})();
