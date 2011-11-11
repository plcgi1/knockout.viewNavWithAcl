/*
 * acl.js - example for knockout.viewNavWithAcl.js usage
 * @requires Knockout JavaScript library v1.3.0ctp, jQuery Templating Plugin, knockout.viewNavWithAcl.js
 * Copyright 2011, Alex Nosoff, plcgi1 (dog) gmail.com
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: 
 * Version:
 *
 */

(function(){
    var AclModel = {
        url: '/js/data/acl.json',
        acl: ko.observableArray([]),
        aclAsJSONString: function(){
            return JSON.stringify(this.acl());
        },
        init: function(){
            var getUniqueTime = function () {
                var time = new Date().getTime();
                while (time == new Date().getTime());
                return new Date().getTime();
            };
            var url = AclModel.url + '?_='+getUniqueTime(); 
            $.ajax({
                url: url,
                dataType: 'application/json',
                type: 'GET',
                success: function(req){
                    req = eval('('+req+')');
                    
                    AclModel.acl(req.acl);
                },
                error: function(e){
                    alert('er: ' + e);
                }
            });
        },
        reload: function(){
            var self = this;
            self.init();
        },
        // implementation of methods for allowed actions in page
        edit: function(){
            DumperAlert(arguments);
        },
        remove: function(){
            DumperAlert(arguments);
        },
        get: function(){
            DumperAlert(arguments);
        }
    };
    $(document).ready(function(){
        AclModel.init();
        ko.applyBindings(AclModel);
    });
})();
