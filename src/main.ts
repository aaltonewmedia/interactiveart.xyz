import * as twgl from 'twgl.js';
import fragmentShader from './fragment.glsl';
import vertexShader from './vertex.glsl';

function init() {
    const glCanvas = <HTMLCanvasElement> document.getElementById("c");
    const gl = <WebGLRenderingContext> glCanvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: true
    });

    if (!gl) return;

    glCanvas.style.display = null!;

    const programInfo = twgl.createProgramInfo(gl, [vertexShader, fragmentShader]);

    const arrays = {
        position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

    
    let video = <HTMLVideoElement> document.getElementById("logo_video");

    var textures: any;
    var texutresPromise = new Promise((resolve, _) => {
        textures = twgl.createTextures(gl, {
            video: {
                src: [0, 0, 255],
                format: gl.RGB,
                min: gl.LINEAR,
                wrap: gl.CLAMP_TO_EDGE,
            },
            blackLogo: { src: <TexImageSource> document.querySelector(".black-logo") },
        }, () => {
            resolve(null);
        });
    });
    

    

    let startTime = -1;
    function render() {
        if (startTime < 0) {
            startTime = performance.now();
        }
        twgl.resizeCanvasToDisplaySize(gl.canvas, 2.0);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        if (!video.seeking) {
            gl.bindTexture(gl.TEXTURE_2D, textures.video)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
        }

        const uniforms = {
            u_time: (performance.now() - startTime) / 1000,
            u_scale: [
                1.0, 
                1.0
            ],
            u_sampler: textures.video,
            u_logoTexture: textures.blackLogo,
            u_resolution: [ gl.canvas.clientWidth * 2.0, gl.canvas.clientHeight  * 2.0],
            u_videoSize: video.videoWidth > gl.canvas.clientWidth * 2.0 ?
            [
                gl.canvas.clientWidth * 2.0,
                video.videoHeight * (gl.canvas.clientWidth * 2.0 / video.videoWidth)
            ]:
            [ 
                video.videoWidth,
                video.videoHeight 
            ]
        }

        gl.useProgram(programInfo.program);
        twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
        twgl.setUniforms(programInfo, uniforms);
        //gl.drawElements(gl.TRIANGLE_STRIP, bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
        //gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        twgl.drawBufferInfo(gl, bufferInfo);

        

        requestAnimationFrame(render);
    }

    let videos = [video];
    let done = 0;

    
    let videoPromise = new Promise((resolve, _) => {
        videos.forEach(v => v?.addEventListener("play", () => {
            done++;
            console.log('play', done, videos.length)
            if (done == videos.length) {
                resolve(null);
            }
        }))
    })
    

    videos.forEach(v => {
        v?.addEventListener("loadeddata", () => {
            console.log("LOAD")
            v.play();
        })
        v?.load();
    })

    Promise.all([texutresPromise, videoPromise])
        .then(() => {
            document.body.classList.add("gl-loaded");
            render()
        })

    
}

window.addEventListener("load", init);