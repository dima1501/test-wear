window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.js-form');
    if (!form) return;

    const submitBtn = form.querySelector('.js-submit');
    const successMessage = form.querySelector('.r-form__success');

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            sendFormData(form);
        }

        form.reportValidity();
        form.classList.add('validated')
    });

    function sendFormData(form) {
        const formData = new FormData(form);
        // fetch('/', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then(response => response.json())
        //     .then(data => {
        successMessage.classList.add('r-form__success--visible')
        //         // Обработка успешной отправки данных
        //     })
        //     .catch(error => {
        //         // Обработка ошибок отправки данных
        //         console.error('Произошла ошибка при отправке данных:', error);
        //     });
    }

    // Инициализация маски
    let element = form.querySelector('.js-number');
    let maskOptions = {
        mask: '+{7}(000)000-00-00'
    };

    IMask(element, maskOptions);

    // Dropzone
    Dropzone.autoDiscover = false;
    let myDropzone = new Dropzone(".js-dropzone", {
        url: "/upload",
        autoProcessQueue: false,
        parallelUploads: 10,
        maxFilesize: 2, // MB
        acceptedFiles: 'image/jpeg,image/png',
        addRemoveLinks: true,
        previewTemplate: document.querySelector('#template-container').innerHTML,
        previewsContainer: "#preview-container", // Указываем контейнер для превью
        init: function () {
            let form = document.querySelector(".js-form");
            let submitButton = form.querySelector(".js-submit");
            let myDropzone = this;

            submitButton.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (myDropzone.getQueuedFiles().length > 0) {
                    myDropzone.processQueue();
                } else {
                    myDropzone.uploadFiles([]); // Пустой массив, чтобы перейти к отправке формы
                }
            });

            myDropzone.on("addedfile", function () {
                form.querySelector(".dz-message").style.display = "none";
                form.querySelector(".dz-preview-decor").style.display = "flex";
            });

            myDropzone.on("removedfile", function () {
                if (myDropzone.files.length === 0) {
                    form.querySelector(".dz-message").style.display = "block";
                    form.querySelector(".dz-preview-decor").style.display = "none";
                }
            });

            this.on("sending", function (file, xhr, formData) {
                let inputs = form.querySelectorAll('input');
                inputs.forEach(function (input) {
                    formData.append(input.name, input.value);
                });
            });

            this.on("queuecomplete", function () {
                document.getElementById("myForm").submit();
            });
        }
    });
});
