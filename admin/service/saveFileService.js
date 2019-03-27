UXSenseWebManager.factory('saveFileService', ["FileSaver", "Blob", function(FileSaver, Blob) {
	var service = {
		saveFile: function(base64, fileName, contentType) {
			if (base64) {
				var byteCharacters = atob(base64);
				var byteNumbers = new Array(byteCharacters.length);
				for (var i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				var byteArray = new Uint8Array(byteNumbers);
				var data = new Blob([byteArray], {
					type: contentType
				});
				FileSaver.saveAs(data, fileName);
			} else {
				console.error("Base64 not defined");
			}
		}
	}
	return service;
}]);
