(()=>{"use strict";function t(t,e,n,r,o,i,u){var c=t.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-counter"),f=c.querySelector(".card__like-button");c.querySelector(".card__title").textContent=e.name;var d=c.querySelector(".card__image");return d.src=e.link,d.alt=e.name,s.textContent=e.likes.length,e.owner._id!=i?a.classList.add("card__delete-button--disabled"):a.addEventListener("click",(function(){n(c,e._id)})),d.addEventListener("click",(function(){return r(e.link,e.alt,e.name)})),e.likes.some((function(t){return t._id===i}))&&f.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){return o(c,e._id,u)})),c}function e(t,e,n){var r=t.querySelector(".card__like-counter"),o=t.querySelector(".card__like-button");o.classList.contains("card__like-button_is-active")?n.unlikeCard(e).then((function(t){null!=t&&(o.classList.remove("card__like-button_is-active"),r.textContent=t.likes.length)})):n.likeCard(e).then((function(t){null!=t&&(o.classList.add("card__like-button_is-active"),r.textContent=t.likes.length)}))}var n;function r(t){n=function(e){!function(t,e){console.log(t),"Escape"===t.key&&o(e)}(e,t)},document.addEventListener("keydown",n),t.classList.add("popup_is-opened")}function o(t){document.removeEventListener("keydown",n),t.classList.remove("popup_is-opened")}function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,a(r.key),r)}}function c(t,e,n){return(e=a(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t){var e=function(t){if("object"!=i(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=i(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==i(e)?e:e+""}var l=function(){return t=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),c(this,"formSelector",void 0),c(this,"inputSelector",void 0),c(this,"submitButtonSelector",void 0),c(this,"inactiveButtonClass",void 0),c(this,"inputErrorClass",void 0),c(this,"errorClass",void 0),this.formSelector=e.formSelector,this.inputSelector=e.inputSelector,this.submitButtonSelector=e.submitButtonSelector,this.inactiveButtonClass=e.inactiveButtonClass,this.inputErrorClass=e.inputErrorClass,this.errorClass=e.errorClass},(e=[{key:"subscribeForms",value:function(){var t=this;document.querySelectorAll(this.formSelector).forEach((function(e){var n=e.querySelector(t.submitButtonSelector),r=Array.from(e.querySelectorAll(t.inputSelector));r.forEach((function(e){t.subscribeInputElement(e,t.textInputValidation.bind(t),r,n)}))}))}},{key:"textInputValidation",value:function(t,e,n){console.info("Input validation: "+t),t.validity.valid?(this.hideError(t),e.every((function(t){return t.validity.valid}))&&this.setButtonOn(n)):(this.setButtonOff(n),t.validity.patternMismatch&&t.setCustomValidity(t.dataset.errorMessage),this.showError(t,t.validationMessage),t.setCustomValidity(""))}},{key:"showError",value:function(t,e){var n=this.getErrorElement(t);n.textContent=e,n.classList.add(this.errorClass)}},{key:"hideError",value:function(t){var e=this.getErrorElement(t);e.classList.remove(this.errorClass),e.textContent=""}},{key:"setButtonOff",value:function(t){t.classList.add(this.inactiveButtonClass)}},{key:"setButtonOn",value:function(t){t.classList.remove(this.inactiveButtonClass)}},{key:"subscribeInputElement",value:function(t,e,n,r){t.addEventListener("input",(function(){e(t,n,r)}))}},{key:"getErrorElement",value:function(t){return document.querySelector(".".concat(t.id,"-error"))}},{key:"clearErrors",value:function(t){var e=this;t.querySelectorAll(this.inputSelector).forEach((function(t){e.hideError(t)}))}}])&&u(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,p(r.key),r)}}function d(t,e,n){return(e=p(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function p(t){var e=function(t){if("object"!=s(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==s(e)?e:e+""}var v=function(){return t=function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),d(this,"baseUrl",void 0),d(this,"headers",void 0),d(this,"token",void 0),this.baseUrl=e,this.token=n,this.headers={authorization:n,"Content-Type":"application/json"}},(e=[{key:"get",value:function(t){return fetch("".concat(this.baseUrl,"/").concat(t),{headers:this.headers}).then((function(t){return t.ok?t.json():Promise.reject("Ответ сервера ".concat(t.status))})).catch((function(t){return console.error("Ошибка выполнения базового запроса GET: ".concat(t))}))}},{key:"path",value:function(t,e){return fetch("".concat(this.baseUrl,"/").concat(t),{method:"PATCH",headers:this.headers,body:JSON.stringify(e)}).then((function(t){return console.info(t),t.ok?t.json():Promise.reject("Ответ сервера ".concat(t.status))})).catch((function(t){return Promise.reject("Ошибка выполнения базового запроса PATCH: ".concat(t))}))}},{key:"post",value:function(t,e){return fetch("".concat(this.baseUrl,"/").concat(t),{method:"POST",headers:this.headers,body:JSON.stringify(e)}).then((function(t){return t.ok?t.json():Promise.reject("Ответ сервера ".concat(t.status))})).catch((function(t){return Promise.reject("Ошибка выполнения базового запроса POST: ".concat(t))}))}},{key:"put",value:function(t){return fetch("".concat(this.baseUrl,"/").concat(t),{method:"PUT",headers:{authorization:this.token}}).then((function(t){return t.ok?t.json():(log.error("Ответ сервера ".concat(t.status)),Promise.reject())})).catch((function(t){return Promise.reject("Ошибка выполнения put")}))}},{key:"delete",value:function(t){return fetch("".concat(this.baseUrl,"/").concat(t),{method:"DELETE",headers:{authorization:this.token}}).then((function(t){return t.ok?t.json():Promise.reject("Ответ сервера ".concat(t.status))})).catch((function(t){return Promise.reject("Ошибка при выполнении запроса DELETE: "+t)}))}},{key:"getProfile",value:function(){return this.get("users/me")}},{key:"updateProfile",value:function(t,e){return this.path("users/me",{name:t,about:e})}},{key:"addCard",value:function(t){return this.post("cards",t)}},{key:"getCards",value:function(){return this.get("cards")}},{key:"deleteCard",value:function(t){return this.delete("cards/".concat(t))}},{key:"likeCard",value:function(t){return this.put("cards/likes/".concat(t))}},{key:"unlikeCard",value:function(t){return this.delete("cards/likes/".concat(t))}},{key:"checkImageLink",value:function(t){return fetch(t,{method:"HEAD"}).then((function(t){if(t.ok){var e=t.headers.get("content-type");if(e&&e.includes("image"))return Promise.resolve(!0)}return Promise.reject()})).catch((function(t){return console.log("Ошибка при проверке ссылки на изображение: ".concat(t)),Promise.reject("Ошибка при проверке ссылки на изображение")}))}},{key:"sendAvatar",value:function(t){return this.path("users/me/avatar",{avatar:t})}}])&&f(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var m,h=document.querySelector("#card-template").content,b=document.querySelector(".places__list"),_=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__image_edit-button"),S=document.querySelector(".profile__add-button"),g=document.querySelectorAll(".popup"),E=document.querySelector(".popup_type_edit"),C=document.forms["edit-profile"],q=document.querySelector(".popup_type_new-card"),P=document.forms["new-place"],w=document.querySelector(".popup_type_image"),L=w.querySelector(".popup__image"),j=w.querySelector(".popup__caption"),x=document.querySelector(".profile"),B=x.querySelector(".profile__title"),O=x.querySelector(".profile__description"),A=x.querySelector(".profile__image"),T=document.querySelector(".popup_type_edit-avatar"),I=document.forms["edit-avatar"],U=document.querySelector(".popup_type_confirm"),D=document.forms.submit,M="";function V(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранение...",n=t.textContent;return t.textContent=e,n}_.addEventListener("click",(function(){return z.clearErrors(C),C.name.value=B.textContent,C.description.value=O.textContent,z.setButtonOn(C.querySelector("button")),void r(E)})),S.addEventListener("click",(function(){r(q)})),k.addEventListener("click",(function(){return I.link.value=A.style.backgroundImage.slice(5,-2),z.clearErrors(I),void r(T)})),C.addEventListener("submit",(function(t){t.preventDefault();var e=t.target.querySelector(".button"),n=V(e);H.updateProfile(C.name.value,C.description.value).then((function(t){var r,i;B.textContent=null!==(r=t.name)&&void 0!==r?r:C.name.value,O.textContent=null!==(i=t.description)&&void 0!==i?i:C.description.value,V(e,n),o(E)})).catch((function(t){return console.error(t)})).finally((function(){V(e,n)}))})),P.addEventListener("submit",(function(n){n.preventDefault();var r=n.target.querySelector(".button"),i=V(r),u={name:P["place-name"].value,link:P.link.value};H.addCard(u).then((function(n){P.reset(),z.setButtonOff(P.querySelector("button")),o(q);var r=t(h,n,F,N,e,M,H);b.prepend(r)})).finally((function(){V(r,i)}))})),I.addEventListener("submit",(function(t){t.preventDefault();var e=t.target.querySelector(".button"),n=V(e);H.checkImageLink(I.link.value).then((function(){return H.sendAvatar(I.link.value)})).then((function(t){A.style.backgroundImage="url(".concat(I.link.value,")")})).then((function(){return o(T)})).catch((function(t){z.showError(I.link,t)})).finally((function(){V(e,n)}))})),D.addEventListener("submit",(function(t){t.preventDefault(),m(),o(U)}));var z=new l({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error-show"}),H=new v("https://nomoreparties.co/v1/wff-cohort-21/","06e37664-dae8-425c-9b1a-fb1b9b710a57");function N(t,e,n){L.src=t,L.alt=e,j.textContent=n,r(w)}function F(t,e){r(U),m=function(){return function(t,e,n){n.deleteCard(e).then((function(e){null!=e&&t.remove()}))}(t,e,H)}}z.subscribeForms(),g.forEach((function(t){t.querySelector(".popup__close").addEventListener("click",(function(){return o(t)})),t.addEventListener("click",(function(e){e.target===t&&o(t)}))})),Promise.all([H.getProfile(),H.getCards()]).then((function(n){var r=n[0],o=n[1];B.textContent=r.name,O.textContent=r.about,A.style.backgroundImage="url(".concat(r.avatar,")"),M=r._id,function(t){var e,n=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return y(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return u=t.done,t},e:function(t){c=!0,i=t},f:function(){try{u||null==n.return||n.return()}finally{if(c)throw i}}}}(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;b.append(r)}}catch(t){n.e(t)}finally{n.f()}}(o.map((function(n){return t(h,n,F,N,e,M,H)})))})).catch((function(t){return console.error(t)}))})();