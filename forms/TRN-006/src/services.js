    "use strict";
    /**
     * @module servicesModule
     */
    var servicesModule = (function(){
        var searchUserMat = function (mat) {
            var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", mat, mat, ConstraintType.MUST);
            var dataset = DatasetFactory.getDataset("colleague", null, [c1], null);
            if (dataset.values.length > 0) {
                return true;
            }
            return false;
        };
        return {
            searchUserMat: searchUserMat
        };
    })();