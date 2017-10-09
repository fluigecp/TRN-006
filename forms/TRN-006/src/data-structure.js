"use strict";
/**
 * @module DataStructureModule
 */
var dataStructureModule = (function () {
    var filterStringMatricula = function (str) {
        var strArray = str.split(",");
        var matriculasArray = [];
        for (var i = 0; i < strArray.length; i++) {
            matriculasArray.push(strArray[i].substring(0, strArray[i].indexOf("-") - 1));
        }
        return matriculasArray;
    };
    return {
        filterStringMatricula: filterStringMatricula
    }
})();
