UXSenseWebManager.factory('alertService', ["$window", "$location", "ngDialog", function($window, $location, ngDialog) {
    var service = {
        /*
        Params = {title:"String", message: "String", button: "OK"}
        */
        alert: function(data) {
            data = data || {};
            data.title = data.title || "";
            data.message = data.message || "";
            data.btn = data.btn || "OK";
            ngDialog.open({
                template: data.message,
                plain: true,
                cache: false,
                closeByDocument: false,
                closeByEscape: false
            });
        },
        confirm: function(data) {
            data = data || {};
            data.title = data.title || "";
            data.message = data.message || "";
            data.btn = data.btn || ["OK"];
            ngDialog.openConfirm({
                template: 'alertDialog.html',
                cache: false,
                closeByDocument: false,
                closeByEscape: false
            });
        }
    };
    return service;
}]);
