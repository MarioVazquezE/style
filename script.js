const video = document.getElementById("videoElement");
    const canvas = document.getElementById("canvasElement");
    const photosContainer = document.getElementById("photosContainer");

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            console.log(stream);
        })
        .catch(function (error) {
            console.log(error);
        });

    document.getElementById("takeSnapshot").addEventListener("click", () => {
        takePicture();
    });

    function takePicture() {
        const aspectRatio = video.videoWidth / video.videoHeight;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/jpeg');
        img.style.width = '100%'; // Para mantener la misma proporción que el video
        img.style.marginBottom = '10px';

        const imgContainer = document.createElement('div');
        imgContainer.style.position = 'relative';

        const downloadButton = document.createElement('button');
        downloadButton.innerText = 'Descargar';
        downloadButton.style.position = 'absolute';
        downloadButton.style.top = '5px';
        downloadButton.style.right = '5px';
        downloadButton.addEventListener('click', () => {
            downloadImage(img.src);
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Eliminar';
        deleteButton.style.position = 'absolute';
        deleteButton.style.top = '5px';
        deleteButton.style.left = '5px';
        deleteButton.addEventListener('click', () => {
            imgContainer.remove();
        });

        imgContainer.appendChild(img);
        imgContainer.appendChild(downloadButton);
        imgContainer.appendChild(deleteButton);
        photosContainer.appendChild(imgContainer);
    }
    document.querySelectorAll('input[type="checkbox"]').forEach(function (sensor) {
        sensor.addEventListener('change', function () {
          takeSnapshot();
        });
    });
    function downloadImage(imageUrl) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'photo.jpg';
        link.click();
    }
