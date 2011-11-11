/*
 * Knockout.js viewModel binding for show and process buttons and links with ACL data from server
 * @requires Knockout JavaScript library v1.3.0ctp, jQuery Templating Plugin
 * Copyright 2011, Alex Nosoff, plcgi1 (dog) gmail.com
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: 
 * Version:
 *
 * @type Knockout
 * @cat Plugins/Viewmodel
 * 
 */

(function(){
    var templateEngine = new ko.jqueryTmplTemplateEngine();
    templateEngine.addTemplate("ko_button", '<input type="button" value="${ label}"/>');
    ko.bindingHandlers.viewNavWithAcl = {
        //<div data-bind='viewNav: { name: "but", data: acl, actionName: "delete" }'></div>
        // some code from tempalte binding
        init: function(element, valueAccessor) {
            var bindingValue = ko.utils.unwrapObservable(valueAccessor());
            var bindingValue = ko.utils.unwrapObservable(valueAccessor());
            if ((typeof bindingValue != "string") && (!bindingValue.name) && (element.nodeType == 1)) {
                // It's an anonymous template - store the element contents, then clear the element
                new ko.templateSources.anonymousTemplate(element).text(element.innerHTML);
                ko.utils.emptyDomNode(element);
            }
            return {
                'controlsDescendantBindings': true
            };
        },
        update: function(element, valueAccessor) {
            var bindingValue = ko.utils.unwrapObservable(valueAccessor());
            var templateName;
            
            if (typeof bindingValue == "string") {
                templateName = bindingValue;
            } else {
                templateName = bindingValue.template;
            }
            if ( !templateName && typeof templateName == 'undefined' ) {
                templateName = 'ko_button';
            }
            var templateSubscription = null;

            if (typeof bindingValue['data'] != "undefined") {
                var data = bindingValue['data']();
                 element.innerHTML = '';
                for ( var i=0;i<data.length;i++ ){
                    if ( data[i]['name'] == bindingValue['name'] ) {
                       
                        var container = element.appendChild(document.createElement("DIV"));
                        
                        data[i]['label'] = bindingValue['label'];
                        ko.renderTemplate(templateName, data[i], { templateEngine: templateEngine }, container, "replaceNode");
                        element.onclick = function(){ bindingValue['action'](data[i]); return false; };
                        break;
                    }
                }
            }
        }
    };
})();