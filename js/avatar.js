'use strict';

(function() {

  var inputFile = document.querySelector('.upload input[type=file]'),
      preview = document.querySelector('.setup-user-pic'),
      FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

  inputFile.addEventListener('change', function() {
    
    // Выбираем загруженный файл
    var file = inputFile.files[0],
        fileName = file.name.toLowerCase(),

        // Если имя файла заканчивается на одно из расширений, то matches === true
        matches = FILE_TYPES.some(function(type) {
          return fileName.endsWith(type);
        });
    
    if (matches) {
      var reader = new FileReader();

      // Показываем загруженную картинку
      reader.addEventListener('load', function() {
        preview.src = reader.result;
      });

      // base64
      reader.readAsDataURL(file);
    }
    
  });


})();