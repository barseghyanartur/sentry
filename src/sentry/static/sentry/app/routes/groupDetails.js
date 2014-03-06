define(['app'], function(app) {
    'use strict';

    return {
        parent: 'project',
        url: 'group/:group_id/',
        templateUrl: '/_static/sentry/app/templates/group-details.html',
        controller: function($scope, $state, groupData, historicalGroupData, selectedEvent){
            $scope.selectedGroup = groupData.data;
            $scope.historicalGroupData = historicalGroupData.data;
            $scope.selectedEvent = selectedEvent.data;
            // TODO: we want to render this inline instead of doing another fetch
            $state.go('event', {
                event_id: selectedEvent.data.id
            });
        },
        resolve: {
            groupData: function($http, $stateParams) {
                return $http.get('/api/0/groups/' + $stateParams.group_id + '/');
            },
            historicalGroupData: function($http, $stateParams) {
                return $http.get('/api/0/groups/' + $stateParams.group_id + '/stats/');
            },
            selectedEvent: function($http, $stateParams) {
                return $http.get('/api/0/groups/' + $stateParams.group_id + '/events/latest/');
            }
        }
    };
});