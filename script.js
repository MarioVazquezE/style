document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('videoElement');
    const takeSnapshotButton = document.getElementById('takeSnapshot');
    const photosContainer = document.getElementById('photosContainer');
    const canvasElement = document.getElementById('canvasElement');
    const context = canvasElement.getContext('2d');

    // Acceder a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoElement.srcObject = stream;
        })
        .catch((err) => {
            console.error('Error al acceder a la cámara: ', err);
        });

    // Tomar una foto al hacer clic en el botón
    takeSnapshotButton.addEventListener('click', () => {
        takePhoto();
    });

    // Función para tomar una foto
    function takePhoto() {
        console.log('Se recibió la señal para tomar una foto');
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        const dataUrl = canvasElement.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = dataUrl;
        photosContainer.appendChild(img);
    }

    // Establecer la conexión WebSocket con el servidor
    const socket = io(); // Asegúrate de haber importado Socket.IO en tu HTML

    // Escuchar la señal 'take-photo' del servidor
    socket.on('take-photo', function() {
    
    takePhoto(); // Llama a la función para tomar la foto
});
});
