import{c as z,a as p,b as _,r as h,s as P,d as w,e as b}from"./vendor.01dbea13.js";const C=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function c(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=c(t);fetch(t.href,n)}};C();var E=`#ifdef GL_ES
precision highp float;
            #endif
varying highp vec2 vTextureCoord;
uniform sampler2D u_sampler;
uniform sampler2D u_logoTexture;
uniform vec2 u_videoSize;
uniform vec2 u_scale;
uniform float u_time;
uniform vec2 u_resolution;

vec3 mod289(vec3 x) {
	return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
	return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
	return mod289(((x * 34.0) + 10.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
	return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
	const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
	const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

	vec3 i = floor(v + dot(v, C.yyy));
	vec3 x0 = v - i + dot(i, C.xxx);

	vec3 g = step(x0.yzx, x0.xyz);
	vec3 l = 1.0 - g;
	vec3 i1 = min(g.xyz, l.zxy);
	vec3 i2 = max(g.xyz, l.zxy);

  
  
  
  
	vec3 x1 = x0 - i1 + C.xxx;
	vec3 x2 = x0 - i2 + C.yyy; 
	vec3 x3 = x0 - D.yyy;      

	i = mod289(i);
	vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));

	float n_ = 0.142857142857; 
	vec3 ns = n_ * D.wyz - D.xzx;

	vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  

	vec4 x_ = floor(j * ns.z);
	vec4 y_ = floor(j - 7.0 * x_);    

	vec4 x = x_ * ns.x + ns.yyyy;
	vec4 y = y_ * ns.x + ns.yyyy;
	vec4 h = 1.0 - abs(x) - abs(y);

	vec4 b0 = vec4(x.xy, y.xy);
	vec4 b1 = vec4(x.zw, y.zw);

  
  
	vec4 s0 = floor(b0) * 2.0 + 1.0;
	vec4 s1 = floor(b1) * 2.0 + 1.0;
	vec4 sh = -step(h, vec4(0.0));

	vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
	vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

	vec3 p0 = vec3(a0.xy, h.x);
	vec3 p1 = vec3(a0.zw, h.y);
	vec3 p2 = vec3(a1.xy, h.z);
	vec3 p3 = vec3(a1.zw, h.w);

	vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
	p0 *= norm.x;
	p1 *= norm.y;
	p2 *= norm.z;
	p3 *= norm.w;

	vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
	m = m * m;
	return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

vec3 fade(vec3 t) {
	return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float cnoise(vec3 P) {
	vec3 Pi0 = floor(P); 
	vec3 Pi1 = Pi0 + vec3(1.0); 
	Pi0 = mod(Pi0, 289.0);
	Pi1 = mod(Pi1, 289.0);
	vec3 Pf0 = fract(P); 
	vec3 Pf1 = Pf0 - vec3(1.0); 
	vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
	vec4 iy = vec4(Pi0.yy, Pi1.yy);
	vec4 iz0 = Pi0.zzzz;
	vec4 iz1 = Pi1.zzzz;

	vec4 ixy = permute(permute(ix) + iy);
	vec4 ixy0 = permute(ixy + iz0);
	vec4 ixy1 = permute(ixy + iz1);

	vec4 gx0 = ixy0 / 7.0;
	vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
	gx0 = fract(gx0);
	vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
	vec4 sz0 = step(gz0, vec4(0.0));
	gx0 -= sz0 * (step(0.0, gx0) - 0.5);
	gy0 -= sz0 * (step(0.0, gy0) - 0.5);

	vec4 gx1 = ixy1 / 7.0;
	vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
	gx1 = fract(gx1);
	vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
	vec4 sz1 = step(gz1, vec4(0.0));
	gx1 -= sz1 * (step(0.0, gx1) - 0.5);
	gy1 -= sz1 * (step(0.0, gy1) - 0.5);

	vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
	vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
	vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
	vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
	vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
	vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
	vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
	vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

	vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
	g000 *= norm0.x;
	g010 *= norm0.y;
	g100 *= norm0.z;
	g110 *= norm0.w;
	vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
	g001 *= norm1.x;
	g011 *= norm1.y;
	g101 *= norm1.z;
	g111 *= norm1.w;

	float n000 = dot(g000, Pf0);
	float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
	float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
	float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
	float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
	float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
	float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
	float n111 = dot(g111, Pf1);

	vec3 fade_xyz = fade(Pf0);
	vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
	vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
	float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
	return ((2.2 * n_xyz) + 1.0) / 2.0;
}

vec2 round(vec2 v) {
	return vec2(floor(v.x), floor(v.y));
}
float easeOutCubic(float x) {
	return 1.0 - pow(1.0 - x, 3.0);
}

float easeInCubic(float x) {
	return x * x * x;
}
float easeInOutQuad(float x) {
	return x < 0.5 ? 2.0 * x * x : 1.0 - pow(-2.0 * x + 2.0, 2.0) / 2.0;
}

  #define TRESH 0.55
float sampleNoise(vec2 uv, vec2 trueUv) {
	float value = cnoise(vec3(uv * vec2(1.0) + vec2(0.0, u_time * 0.004), 1.0) * 6.1) * 0.95 + (cnoise(vec3(uv * vec2(1.0) + vec2(u_time * 0.02), 1.0) * 10.0) * 0.1 - 0.05);

	float fadeOut = cnoise(vec3(vec2(trueUv.x, 0.0) + vec2(u_time * 0.01), 0.0) * 10.0) * 0.5;
	return mix(value, 0.0, easeInCubic(max(0.0, (1.0 - trueUv.y) - (1.0 - fadeOut)) / fadeOut));
}

void main() {
	vec2 size = u_videoSize * u_scale;
	vec2 texturePos = u_resolution / 2.0 - size / 2.0 - vec2(0.0, -20.0);

	vec2 trueUv = gl_FragCoord.xy / u_resolution;
	vec2 fullUV = gl_FragCoord.xy / max(u_resolution.x, u_resolution.y);
	vec2 uv = (gl_FragCoord.xy - texturePos.xy) / size;

	highp vec4 texelColor = texture2D(u_sampler, vec2(uv.x, 1.0 - uv.y));
	highp vec4 logoColor = texture2D(u_logoTexture, vec2(uv.x, 1.0 - uv.y));

	float bottomMultiplier = trueUv.y;
	float noise = sampleNoise(fullUV, trueUv);
	float shadowNoise = sampleNoise(fullUV + vec2(0.0, 0.0075), trueUv + vec2(0.0, 0.0075));
	vec4 color1 = texelColor; 
	vec4 color2 = vec4(vec3(219.0 / 255.0, 225.0 / 255.0, 255.0 / 255.0), logoColor.a);
            
            

	float tresh = mix(1.0, TRESH, 1.0);
	vec4 finalColor = noise > tresh ? color1 * vec4(shadowNoise < tresh ? vec3(0.75) : vec3(1.0), easeOutCubic(min(1.0, u_time / 2.0))) : color2;
	gl_FragColor = finalColor;
	gl_FragColor = vec4(gl_FragColor.rgb * gl_FragColor.a, gl_FragColor.a);

}`,I=`attribute vec4 position;

void main() {
    gl_Position = position;
}`;function S(){var y;const v=document.getElementById("c"),e=v.getContext("webgl",{alpha:!0,premultipliedAlpha:!0});if(!e)return;v.style.display=null;const c=z(e,[I,E]),t=p(e,{position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]});let n=document.getElementById("logo_video");var r,d=new Promise((o,m)=>{r=_(e,{video:{src:[0,0,255],format:e.RGB,min:e.LINEAR,wrap:e.CLAMP_TO_EDGE},blackLogo:{src:document.querySelector(".black-logo")}},()=>{o(null)})});let l=-1;function u(){l<0&&(l=performance.now()),h(e.canvas,2),e.viewport(0,0,e.canvas.width,e.canvas.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),n.seeking||(e.bindTexture(e.TEXTURE_2D,r.video),e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,n));const o={u_time:(performance.now()-l)/1e3,u_scale:[1,1],u_sampler:r.video,u_logoTexture:r.blackLogo,u_resolution:[e.canvas.clientWidth*2,e.canvas.clientHeight*2],u_videoSize:n.videoWidth>e.canvas.clientWidth*2?[e.canvas.clientWidth*2,n.videoHeight*(e.canvas.clientWidth*2/n.videoWidth)]:[n.videoWidth,n.videoHeight]};e.useProgram(c.program),P(e,c,t),w(c,o),b(e,t),requestAnimationFrame(u)}let i=[n],s=0,f=new Promise((o,m)=>{i.forEach(g=>g==null?void 0:g.addEventListener("play",()=>{s++,console.log("play",s,i.length),s==i.length&&o(null)}))});i.forEach(o=>{o==null||o.addEventListener("loadeddata",()=>{console.log("LOAD"),o.play()}),o==null||o.load()}),Promise.all([d,f]).then(()=>{document.body.classList.add("gl-loaded"),u()});let x=document.querySelector(".accessability_statement");(y=document.querySelector(".accessability_btn"))==null||y.addEventListener("click",o=>{o.preventDefault(),x.style.display=="none"?x.style.display="inline":x.style.display="none"})}window.addEventListener("load",S);
