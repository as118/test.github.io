(function(global) {
    "use strict";

    var camera, scene, renderer;

    var Particles = {
        init: function(el) {},

        animate: function() {},

        render: function() {}
    };

    global.Particles = Particles;
})(window);

init: function(el) {
    var terrainSize = 200; //размер поверхности

    // Создание сцены
    scene = new THREE.Scene();

    // Создание камеры
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(0, 200, 1700);
    camera.rotation.set(0, 0, 0);

    // Создание частиц
    /* Этот участок кода мы рассмотрим подробнее дальше */
    var geometry = new THREE.Geometry();
    var vertex, i1, j1;
    for (var i = 0; i < terrainSize; i++) {
        for (var j = 0; j < terrainSize; j++) {
            vertex = new THREE.Vector3();
            vertex.x = (i - terrainSize / 2) * 8 + (Math.random() - 0.5) * 8;
            vertex.y = 125;
            vertex.z = (j - terrainSize / 2) * 8 + (Math.random() - 0.5) * 8;
            geometry.vertices.push(vertex);
        }
    }

    // Создание текстуры
    var textureLoader = new THREE.TextureLoader();
    var material = new THREE.PointsMaterial({
        color: 0xffdb8f,
        size: 10,
        map: textureLoader.load("particle.png"),
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    // Добавляем систему частиц на сцену
    var particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Создание визуализатора
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x6f267d, 0);
    el.append(renderer.domElement);

    Particles.animate();
}
    animate: function() {
    requestAnimationFrame(Particles.animate);
    Particles.render();

    render: function() {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
