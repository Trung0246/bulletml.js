/*
 bulletml.js v0.5.0-SNAPSHOT

 License
 http://daishihmr.mit-license.org/
*/
var bulletml={GLOBAL:this,_temp:function(){}};
(function(){function c(a,b){for(var c=0,f=a.length;c<f;c++)if(a[c].label==b)return a[c]}bulletml.Root=function(a){this.type="none";this.root=this;this.actions=[];this.bullets=[];this.fires=[];if(void 0!==a){for(var b in a)a.hasOwnProperty(b)&&(a[b].label=b,a[b]instanceof bulletml.Action?this.actions.push(a[b]):a[b]instanceof bulletml.Bullet?this.bullets.push(a[b]):a[b]instanceof bulletml.Fire&&this.fires.push(a[b]));a=0;for(b=this.actions.length;a<b;a++)this.actions[a].setRoot(this);a=0;for(b=this.bullets.length;a<
b;a++)this.bullets[a].setRoot(this);a=0;for(b=this.fires.length;a<b;a++)this.fires[a].setRoot(this)}};bulletml.Root.prototype.findAction=function(a){return c(this.actions,a)};bulletml.Root.prototype.getTopActionLabels=function(){for(var a=[],b=0,c=this.actions.length;b<c;b++){var f=this.actions[b];f.label&&0===f.label.indexOf("top")&&(a[a.length]=f.label)}return a};bulletml.Root.prototype.findActionOrThrow=function(a){var b;if(b=this.findAction(a))return b;throw Error("action labeled '"+a+"' is undefined.");
};bulletml.Root.prototype.findBullet=function(a){return c(this.bullets,a)};bulletml.Root.prototype.findBulletOrThrow=function(a){var b;if(b=this.findBullet(a))return b;throw Error("bullet labeled '"+a+"' is undefined.");};bulletml.Root.prototype.findFire=function(a){return c(this.fires,a)};bulletml.Root.prototype.findFireOrThrow=function(a){var b;if(b=this.findFire(a))return b;throw Error("fire labeled '"+a+"' is undefined.");};bulletml.Bullet=function(){this.root=this.label=null;this.direction=new bulletml.Direction(0);
this.speed=new bulletml.Speed(1);this.actions=[];this.option={};this._localScope={}};bulletml.Bullet.prototype.clone=function(a){var b=new bulletml.Bullet;b.label=this.label;b.root=this.root;b.actions=this.actions;b.direction=new bulletml.Direction(a.evalParam(this.direction.value));b.direction.type=this.direction.type;b.speed=new bulletml.Speed(a.evalParam(this.speed.value));b.speed.type=this.speed.type;b.option=this.option;b._localScope=a._localScope;return b};bulletml.Bullet.prototype.setRoot=
function(a){this.root=a;for(var b=0,c=this.actions.length;b<c;b++)this.actions[b].setRoot(a)};bulletml.BulletRef=function(){this.label=this.root=null;this.params=[]};bulletml.BulletRef.prototype.clone=function(a){var b=a._localScope;a._localScope=a.newScope(this.params);var c=this.root.findBulletOrThrow(this.label).clone(a);a._localScope=b;return c};bulletml.BulletRef.prototype.setRoot=function(a){this.root=a};bulletml.Command=function(){this.commandName=""};bulletml.Command.prototype.setRoot=function(a){this.root=
a};bulletml.Action=function(){this.commandName="action";this.root=this.label=null;this.commands=[];this.params=[]};bulletml.Action.prototype=new bulletml.Command;bulletml.Action.prototype.setRoot=function(a){this.root=a;for(var b=0,c=this.commands.length;b<c;b++)this.commands[b].setRoot(a)};bulletml.Action.prototype.clone=function(){var a=new bulletml.Action;a.label=this.label;a.root=this.root;a.commands=this.commands;return a};bulletml.ActionRef=function(){this.commandName="actionRef";this.root=
this.label=null;this.params=[]};bulletml.ActionRef.prototype=new bulletml.Command;bulletml.ActionRef.prototype.clone=function(){var a=new bulletml.Action;a.root=this.root;a.commands.push(this);return a};bulletml.Fire=function(){this.commandName="fire";this.bullet=this.speed=this.direction=this.root=this.label=null;this.option=new bulletml.FireOption};bulletml.Fire.prototype=new bulletml.Command;bulletml.Fire.prototype.setRoot=function(a){this.root=a;this.bullet&&this.bullet.setRoot(a)};bulletml.FireRef=
function(){this.commandName="fireRef";this.label=null;this.params=[]};bulletml.FireRef.prototype=new bulletml.Command;bulletml.ChangeDirection=function(){this.commandName="changeDirection";this.direction=new bulletml.Direction;this.term=0};bulletml.ChangeDirection.prototype=new bulletml.Command;bulletml.ChangeSpeed=function(){this.commandName="changeSpeed";this.speed=new bulletml.Speed;this.term=0};bulletml.ChangeSpeed.prototype=new bulletml.Command;bulletml.Accel=function(){this.commandName="accel";
this.horizontal=new bulletml.Horizontal;this.vertical=new bulletml.Vertical;this.term=0};bulletml.Accel.prototype=new bulletml.Command;bulletml.Wait=function(a){this.commandName="wait";this.value=a||0};bulletml.Wait.prototype=new bulletml.Command;bulletml.Vanish=function(){this.commandName="vanish"};bulletml.Vanish.prototype=new bulletml.Command;bulletml.Repeat=function(){this.commandName="repeat";this.times=0;this.action=null;this.params=[]};bulletml.Repeat.prototype=new bulletml.Command;bulletml.Repeat.prototype.setRoot=
function(a){this.root=a;this.action&&this.action.setRoot(a)};bulletml.Bind=function(a,b){this.commandName="bind";this.variable=a;this.expression=b};bulletml.Bind.prototype=new bulletml.Command;bulletml.Notify=function(a,b){this.commandName="notify";this.eventName=a;this.params=b||null};bulletml.Notify.prototype=new bulletml.Command;bulletml.DummyCommand=new bulletml.Command;bulletml.Direction=function(a){this.type="aim";this.value=a||0};bulletml.Speed=function(a){this.type="absolute";this.value=void 0===
a?1:a};bulletml.Horizontal=function(a){this.type="absolute";this.value=a||0};bulletml.Vertical=function(a){this.type="absolute";this.value=a||0};bulletml.FireOption=function(a){a=a||{};this.offsetX=a.offsetX||0;this.offsetY=a.offsetY||0;this.autonomy=!0;void 0!==a.autonomy&&(this.autonomy=!!a.autonomy)};bulletml.OffsetX=function(a){this.value=a||0};bulletml.OffsetY=function(a){this.value=a||0};bulletml.Autonomy=function(a){this.value=!!a}})();var BulletML=bulletml;(function(){bulletml.Walker=function(c,a){this._root=c;this._stack=[];this._cursor=-1;this._action=null;this._localScope={};this._globalScope={$rank:a||0}};bulletml.Walker.prototype.next=function(){this._cursor+=1;if(null!==this._action){var c=this._action.commands[this._cursor];if(void 0!==c){if(c instanceof bulletml.Action)return this.pushStack(),this._action=c,this._localScope=this.cloneScope(),this.next();if(c instanceof bulletml.ActionRef)return this.pushStack(),this._action=this._root.findActionOrThrow(c.label),
this._localScope=this.newScope(c.params),this.next();if(c instanceof bulletml.Repeat)return this._localScope.loopCounter=0,this._localScope.loopEnd=this.evalParam(c.times),this.pushStack(),this._action=c.action.clone(),this._localScope=this.cloneScope(),this.next();if(c instanceof bulletml.Fire){var a=new bulletml.Fire;a.bullet=c.bullet.clone(this);null!==c.direction&&(a.direction=new bulletml.Direction(this.evalParam(c.direction.value)),a.direction.type=c.direction.type);null!==c.speed&&(a.speed=
new bulletml.Speed(this.evalParam(c.speed.value)),a.speed.type=c.speed.type);a.option=c.option;return a}return c instanceof bulletml.FireRef?(this.pushStack(),this._action=new bulletml.Action,this._action.commands=[this._root.findFireOrThrow(c.label)],this._localScope=this.newScope(c.params),this.next()):c instanceof bulletml.ChangeDirection?(a=new bulletml.ChangeDirection,a.direction.type=c.direction.type,a.direction.value=this.evalParam(c.direction.value),a.term=this.evalParam(c.term),a):c instanceof
bulletml.ChangeSpeed?(a=new bulletml.ChangeSpeed,a.speed.type=c.speed.type,a.speed.value=this.evalParam(c.speed.value),a.term=this.evalParam(c.term),a):c instanceof bulletml.Accel?(a=new bulletml.Accel,a.horizontal.type=c.horizontal.type,a.horizontal.value=this.evalParam(c.horizontal.value),a.vertical.type=c.vertical.type,a.vertical.value=this.evalParam(c.vertical.value),a.term=this.evalParam(c.term),a):c instanceof bulletml.Wait?new bulletml.Wait(this.evalParam(c.value)):c instanceof bulletml.Bind?
(this._localScope["$"+c.variable]=this.evalParam(c.expression),bulletml.DummyCommand):c instanceof bulletml.Notify?c:null}this.popStack();if(null===this._action)return null;if((c=this._action.commands[this._cursor])&&"repeat"==c.commandName)this._localScope.loopCounter++,this._localScope.loopCounter<this._localScope.loopEnd&&(this.pushStack(),this._action=c.action.clone(),this._localScope=this.cloneScope());return this.next()}return null};bulletml.Walker.prototype.pushStack=function(){this._stack.push({action:this._action,
cursor:this._cursor,scope:this._localScope});this._cursor=-1};bulletml.Walker.prototype.popStack=function(){var c=this._stack.pop();c?(this._cursor=c.cursor,this._action=c.action,this._localScope=c.scope):(this._cursor=-1,this._action=null,this._localScope={})};bulletml.Walker.prototype.evalParam=function(c){var a;if("number"===typeof c)return c;if(isNaN(a=Number(c))){if((a=this._localScope[c])||(a=this._globalScope[c]))return a;if("$rand"==c)return Math.random()}else return a;a={};for(var b in this._globalScope)this._globalScope.hasOwnProperty(b)&&
(a[b]=this._globalScope[b]);for(b in this._localScope)this._localScope.hasOwnProperty(b)&&(a[b]=this._localScope[b]);a.$rand=Math.random();if(b=this._stack[this._stack.length-1])a.$loop={index:b.scope.loopCounter,count:b.scope.loopCounter+1,first:0===b.scope.loopCounter,last:b.scope.loopCounter===b.scope.loopEnd-1};return eval("bulletml._temp = function() { return "+c.split("$").join("this.$")+"}").bind(a)()};bulletml.Walker.prototype.newScope=function(c){var a={};if(c)for(var b=0,d=c.length;b<d;b++)a["$"+
(b+1)]=this.evalParam(c[b]);else for(b in this._localScope)this._localScope.hasOwnProperty(b)&&(a[b]=this._localScope[b]);return a};bulletml.Walker.prototype.cloneScope=function(){var c={},a;for(a in this._localScope)this._localScope.hasOwnProperty(a)&&(c[a]=this._localScope[a]);return c};bulletml.Root.prototype.getWalker=function(c,a){var b=new bulletml.Walker(this,a),d=this.findAction(c);d&&(b._action=d);return b};bulletml.Bullet.prototype.getWalker=function(c){var c=new bulletml.Walker(this.root,
c),a=new bulletml.Action;a.root=this.root;a.commands=this.actions;c._action=a;c._localScope=this._localScope;return c}})();(function(){function c(b){var c=new bulletml.Root;if(b=b.getElementsByTagName("bulletml")[0]){m(b,"type",function(a){c.type=a});var g=b.getElementsByTagName("action");if(g)for(var i=0,j=g.length;i<j;i++)if(g[i].parentNode===b){var h=a(c,g[i]);h&&(c.actions[c.actions.length]=h)}if(g=b.getElementsByTagName("bullet")){i=0;for(j=g.length;i<j;i++)g[i].parentNode===b&&(h=d(c,g[i]))&&(c.bullets[c.bullets.length]=h)}if(g=b.getElementsByTagName("fire")){i=0;for(j=g.length;i<j;i++)g[i].parentNode===b&&(h=f(c,
g[i]))&&(c.fires[c.fires.length]=h)}return c}}function a(c,e){var k=new bulletml.Action;m(e,"label",function(a){k.label=a});j(e,".",function(e){switch(e.tagName.toLowerCase()){case "action":k.commands[k.commands.length]=a(c,e);break;case "actionref":k.commands[k.commands.length]=b(c,e);break;case "fire":k.commands[k.commands.length]=f(c,e);break;case "fireref":var d=k.commands,n=k.commands.length,p=new bulletml.FireRef;m(e,"label",function(a){p.label=a});j(e,/param$/,function(a){p.params[p.params.length]=
h(a)});p.root=c;d[n]=p;break;case "changedirection":var d=k.commands,n=k.commands.length,s=new bulletml.ChangeDirection;s.root=c;i(e,"direction",function(a){s.direction=g(new bulletml.Direction,a)});i(e,"term",function(a){s.term=h(a)});d[n]=s;break;case "changespeed":var d=k.commands,n=k.commands.length,t=new bulletml.ChangeSpeed;t.root=c;i(e,"speed",function(a){t.speed=g(new bulletml.Speed,a)});i(e,"term",function(a){t.term=h(a)});d[n]=t;break;case "accel":var d=k.commands,n=k.commands.length,q=
new bulletml.Accel;q.root=c;i(e,"horizontal",function(a){q.horizontal=g(new bulletml.Horizontal,a)});i(e,"vertical",function(a){q.vertical=g(new bulletml.Vertical,a)});i(e,"term",function(a){q.term=h(a)});d[n]=q;break;case "wait":var d=k.commands,n=k.commands.length,u=new bulletml.Wait;u.root=c;u.value=h(e);d[n]=u;break;case "vanish":e=k.commands;d=k.commands.length;n=new bulletml.Vanish;n.root=c;e[d]=n;break;case "repeat":var d=k.commands,n=k.commands.length,r=new bulletml.Repeat;i(e,"action",function(b){r.action=
a(c,b)});i(e,"actionRef",function(a){r.action=b(c,a)});i(e,"times",function(a){r.times=h(a)});r.root=c;d[n]=r}});k.root=c;return k}function b(a,b){var c=new bulletml.ActionRef;m(b,"label",function(a){c.label=a});j(b,/param$/,function(a){c.params[c.params.length]=h(a)});c.root=a;return c}function d(c,e){var d=new bulletml.Bullet;m(e,"label",function(a){d.label=a});i(e,"direction",function(a){d.direction=g(new bulletml.Direction,a)});i(e,"speed",function(a){d.speed=g(new bulletml.Speed,a)});j(e,/(action)|(actionRef)$/,
function(e){"action"==e.tagName.toLowerCase()?d.actions[d.actions.length]=a(c,e):"actionref"==e.tagName.toLowerCase()&&(d.actions[d.actions.length]=b(c,e))});d.root=c;return d}function f(a,b){var c=new bulletml.Fire;m(b,"label",function(a){c.label=a});i(b,"direction",function(a){c.direction=g(new bulletml.Direction,a)});i(b,"speed",function(a){c.speed=g(new bulletml.Speed,a)});i(b,"bullet",function(b){c.bullet=d(a,b)});i(b,"bulletref",function(b){var e=new bulletml.BulletRef;m(b,"label",function(a){e.label=
a});j(b,/param$/,function(a){e.params[e.params.length]=h(a)});e.root=a;c.bullet=e});if(!c.bullet)throw Error("fire has no bullet or bulletRef.");c.root=a;return c}function g(a,b){m(b,"type",function(b){a.type=b});h(b,function(b){a.value=b});return a}function i(a,b,c,g){for(var b=b.toLowerCase(),a=a.childNodes,i=0,d=a.length;i<d;i++)if(a[i].tagName&&a[i].tagName.toLowerCase()==b)return c&&c(a[i]),a[i];g&&g();return null}function j(a,b,c){for(var a=a.childNodes,g=0,i=a.length;g<i;g++)a[g].tagName&&
a[g].tagName.toLowerCase().match(b)&&c(a[g])}function m(a,b,c,g){if(a=a.attributes[b])return c&&c(a.value),a;g&&g()}function h(a,b){var c=a.textContent.trim();if(void 0!==c||a.childNodes[0]&&(c=a.childNodes[0].nodeValue,void 0!==c))return b&&b(c),c}bulletml.build=function(a){if("string"===typeof a)var b=new DOMParser,a=c(b.parseFromString(a,"application/xml"));else if(a.getElementsByTagName("bulletml"))a=c(a);else throw Error("cannot build "+a);return a}})();(function(){bulletml.dsl=function(c){var c=c||"",a;for(a in bulletml.dsl)bulletml.dsl.hasOwnProperty(a)&&(bulletml.GLOBAL[c+a]=bulletml.dsl[a])};bulletml.dsl.action=function(c){if(0<arguments.length)for(var a=0,b=arguments.length;a<b;a++)arguments[a]instanceof Function&&(arguments[a]=arguments[a]());if(c instanceof Array){a=0;for(b=c.length;a<b;a++)c[a]instanceof Function&&(c[a]=c[a]())}var d=new bulletml.Action;if(c instanceof Array){if(c.some(function(a){return!(a instanceof bulletml.Command)}))throw Error("argument type error.");
d.commands=c}else{a=0;for(b=arguments.length;a<b;a++)if(arguments[a]instanceof bulletml.Command)d.commands[a]=arguments[a];else throw Error("argument type error.");}return d};bulletml.dsl.actionRef=function(c,a){for(var b=0,d=arguments.length;b<d;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===c)throw Error("label is required.");d=new bulletml.ActionRef;d.label=""+c;if(a instanceof Array)d.params=a;else for(b=1;b<arguments.length;b++)d.params.push(arguments[b]);return d};
bulletml.dsl.bullet=function(c,a,b,d){for(var f=0,g=arguments.length;f<g;f++)arguments[f]instanceof Function&&(arguments[f]=arguments[f]());g=new bulletml.Bullet;for(f=0;f<arguments.length;f++)arguments[f]instanceof bulletml.Direction?g.direction=arguments[f]:arguments[f]instanceof bulletml.Speed?g.speed=arguments[f]:arguments[f]instanceof bulletml.Action?g.actions.push(arguments[f]):arguments[f]instanceof bulletml.ActionRef?g.actions.push(arguments[f]):arguments[f]instanceof Array?g.actions.push(bulletml.dsl.action(arguments[f])):
arguments[f]instanceof Object?g.option=arguments[f]:"string"===typeof arguments[f]&&(g.label=arguments[f]);return g};bulletml.dsl.bulletRef=function(c,a){for(var b=0,d=arguments.length;b<d;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===c)throw Error("label is required.");d=new bulletml.BulletRef;d.label=""+c;if(a instanceof Array)d.params=a;else for(b=1;b<arguments.length;b++)d.params.push(arguments[b]);return d};bulletml.dsl.fire=function(c,a,b,d){for(var f=0,g=arguments.length;f<
g;f++)arguments[f]instanceof Function&&(arguments[f]=arguments[f]());g=new bulletml.Fire;for(f=0;f<arguments.length;f++)arguments[f]instanceof bulletml.Direction?g.direction=arguments[f]:arguments[f]instanceof bulletml.Speed?g.speed=arguments[f]:arguments[f]instanceof bulletml.Bullet?g.bullet=arguments[f]:arguments[f]instanceof bulletml.BulletRef?g.bullet=arguments[f]:arguments[f]instanceof bulletml.FireOption?g.option=arguments[f]:arguments[f]instanceof bulletml.OffsetX?g.option.offsetX=arguments[f].value:
arguments[f]instanceof bulletml.OffsetY?g.option.offsetY=arguments[f].value:arguments[f]instanceof bulletml.Autonomy&&(g.option.autonomy=arguments[f].value);if(void 0===g.bullet)throw Error("bullet (or bulletRef) is required.");return g};bulletml.dsl.fireRef=function(c,a){for(var b=0,d=arguments.length;b<d;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===c)throw Error("label is required.");d=new bulletml.FireRef;d.label=""+c;if(a instanceof Array)d.params=a;else for(b=
1;b<arguments.length;b++)d.params.push(arguments[b]);return d};bulletml.dsl.changeDirection=function(c,a){for(var b=0,d=arguments.length;b<d;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===c)throw Error("direction is required.");if(void 0===a)throw Error("term is required.");b=new bulletml.ChangeDirection;b.direction=c instanceof bulletml.Direction?c:new bulletml.Direction(c);b.term=a;return b};bulletml.dsl.changeSpeed=function(c,a){for(var b=0,d=arguments.length;b<
d;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===c)throw Error("speed is required.");if(void 0===a)throw Error("term is required.");b=new bulletml.ChangeSpeed;b.speed=c instanceof bulletml.Speed?c:new bulletml.Speed(c);b.term=a;return b};bulletml.dsl.accel=function(c,a,b){for(var d=0,f=arguments.length;d<f;d++)arguments[d]instanceof Function&&(arguments[d]=arguments[d]());f=new bulletml.Accel;for(d=0;d<arguments.length;d++)arguments[d]instanceof bulletml.Horizontal?
f.horizontal=c:arguments[d]instanceof bulletml.Vertical?f.vertical=a:f.term=arguments[d];if(void 0===f.horizontal&&void 0===f.vertical)throw Error("horizontal or vertical is required.");if(void 0===f.term)throw Error("term is required.");return f};bulletml.dsl.wait=function(c){for(var a=0,b=arguments.length;a<b;a++)arguments[a]instanceof Function&&(arguments[a]=arguments[a]());if(void 0===c)throw Error("value is required.");return new bulletml.Wait(c)};bulletml.dsl.vanish=function(){return new bulletml.Vanish};
bulletml.dsl.repeat=function(c,a){for(var b=0,d=arguments.length;b<d;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===c)throw Error("times is required.");if(void 0===a)throw Error("action is required.");d=new bulletml.Repeat;d.times=c;if(a instanceof bulletml.Action||a instanceof bulletml.ActionRef)d.action=a;else if(a instanceof Array)d.action=bulletml.dsl.action(a);else{for(var f=[],b=1;b<arguments.length;b++)f.push(arguments[b]);d.action=bulletml.dsl.action(f)}return d};
bulletml.dsl.bindVar=function(c,a){return new bulletml.Bind(c,a)};bulletml.dsl.notify=function(c,a){return new bulletml.Notify(c,a)};bulletml.dsl.direction=function(c,a){for(var b=0,d=arguments.length;b<d;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===c)throw Error("value is required.");b=new bulletml.Direction(c);void 0!==a&&(b.type=a);return b};bulletml.dsl.speed=function(c,a){for(var b=0,d=arguments.length;b<d;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());
if(void 0===c)throw Error("value is required.");b=new bulletml.Speed(c);a&&(b.type=a);return b};bulletml.dsl.horizontal=function(c,a){for(var b=0,d=arguments.length;b<d;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===c)throw Error("value is required.");b=new bulletml.Horizontal(c);a&&(b.type=a);return b};bulletml.dsl.vertical=function(c,a){for(var b=0,d=arguments.length;b<d;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===c)throw Error("value is required.");
b=new bulletml.Vertical(c);a&&(b.type=a);return b};bulletml.dsl.fireOption=function(c){return new bulletml.FireOption(c)};bulletml.dsl.offsetX=function(c){return new bulletml.OffsetX(c)};bulletml.dsl.offsetY=function(c){return new bulletml.OffsetY(c)};bulletml.dsl.autonomy=function(c){return new bulletml.Autonomy(c)}})();enchant.bulletml=enchant.bulletml||{};
(function(){function c(a){for(;a<=-Math.PI;)a+=2*Math.PI;for(;Math.PI<a;)a-=2*Math.PI;return a}function a(a,b){return Math.atan2(b.y+(b.height||0)/2-(a.y+(a.height||0)/2),b.x+(b.width||0)/2-(a.x+(a.width||0)/2))}enchant.Game._loadFuncs.bml=enchant.Game._loadFuncs.xml=function(a,b){var c=this,d=new XMLHttpRequest;d.onreadystatechange=function(){if(4===d.readyState){if(200!==d.status&&0!==d.status)throw Error(d.status+": Cannot load an asset: "+a);if(null!=d.responseXML){var f=bulletml.build(d.responseXML);
f?c.assets[a]=new enchant.bulletml.AttackPattern(f):(alert(a+"\u306f\u59a5\u5f53\u306aBulletML\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002"),c.assets[a]=d.responseXML);b()}else throw Error(d.status+": Cannot load an asset: "+a);}};d.open("GET",a,!0);d.overrideMimeType&&d.overrideMimeType("application/xml");d.send(null)};enchant.EventTarget.prototype.setDanmaku=function(a,b){if(void 0===a)throw Error("AttackPattern is required.");this.removeDanmaku();this.on("enterframe",a.createTicker(b))};enchant.EventTarget.prototype.removeDanmaku=
function(){if(this._listeners.enterframe&&0!==this._listeners.enterframe.length){for(var a=[],b=this._listeners.enterframe.length;b--;)this._listeners.enterframe[b].isDanmaku&&(a[a.length]=this._listeners.enterframe[b]);for(b=a.length;b--;)this.removeEventListener("enterframe",a[b])}};enchant.bulletml.getDefaultImage=function(){if(this.value)return this.value;var a=new enchant.Surface(8,8),b=a.context,c=b.createRadialGradient(4,4,0,4,4,4);c.addColorStop(0,"rgba(255,255,255,1.0)");c.addColorStop(0.5,
"rgba(255,255,255,1.0)");c.addColorStop(0.8,"rgba(255,  0,  0,0.8)");c.addColorStop(1,"rgba(255,  0,  0,0.0)");b.fillStyle=c;b.fillRect(0,0,8,8);return this.value=a};enchant.bulletml.AttackPattern=enchant.Class.create({initialize:function(a){if(!a)throw Error("argument is invalid.",a);this._bulletml=a},createTicker:function(a,b){a instanceof enchant.Node&&(a={target:a});var c=this._bulletml.getTopActionLabels();if(void 0===b&&1<c.length){for(var d=[],f=0,l=c.length;f<l;f++)d[d.length]=this._createTicker(a,
c[f]);for(var e=function(){for(var a=d.length;a--;)d[a].call(this);e.compChildCount===d.length&&(e.complete=!0,this.dispatchEvent(new Event("completeattack")))},f=d.length;f--;)d[f].parentTicker=e;e.compChildCount=0;e.completeChild=function(){this.compChildCount++};e.compChildCount=0;e.complete=!1;e.isDanmaku=!0;return e}return this._createTicker(a,b)},_createTicker:function(a,b){var c=a,f={},h=enchant.bulletml.AttackPattern.defaultConfig,l;for(l in h)h.hasOwnProperty(l)&&(f[l]=h[l]);for(l in c)c.hasOwnProperty(l)&&
(f[l]=c[l]);a=f;if(!a.target)throw Error("target is undefined in config.");var e=function(){var a=e.config,b=e._pattern;if(b)if(this.age<e.chDirEnd?e.direction+=e.dirIncr:this.age===e.chDirEnd&&(e.direction=e.dirFin),this.age<e.chSpdEnd?e.speed+=e.spdIncr:this.age===e.chSpdEnd&&(e.speed=e.spdFin),this.age<e.aclEnd?(e.speedH+=e.aclIncrH,e.speedV+=e.aclIncrV):this.age===e.aclEnd&&(e.speedH=e.aclFinH,e.speedV=e.aclFinV),this.x+=Math.cos(e.direction)*e.speed*a.speedRate,this.y+=Math.sin(e.direction)*
e.speed*a.speedRate,this.x+=e.speedH*a.speedRate,this.y+=e.speedV*a.speedRate,a.isInsideOfWorld(this)){if(a.updateProperties||this.updateProperties)this.rotation=e.direction*d,this.speed=e.speed;if(!(this.age<e.waitTo||e.completed)){for(var c;c=e.walker.next();)switch(c.commandName){case "fire":b._fire.call(this,c,a,e,b);break;case "wait":a=0;e.waitTo="number"===typeof c.value?this.age+c.value:0!==(a=~~c.value)?this.age+a:this.age+eval(c.value);return;case "changeDirection":b._changeDirection.call(this,
c,a,e);break;case "changeSpeed":b._changeSpeed.call(this,c,e);break;case "accel":b._accel.call(this,c,e);break;case "vanish":this.parentNode&&this.parentNode.removeChild(this)}e.completed=!0;e.parentTicker?e.parentTicker.completeChild():this.dispatchEvent(new Event("completeattack"))}}else this.parentNode&&this.parentNode.removeChild(this),e.completed=!0,e.parentTicker?e.parentTicker.completeChild():this.dispatchEvent(new Event("completeattack"))},b=b||"top";if("string"===typeof b)e.walker=this._bulletml.getWalker(b,
a.rank);else if(b instanceof bulletml.Bullet)e.walker=b.getWalker(a.rank);else throw window.console.error(a,b),Error("\u5f15\u6570\u304c\u4e0d\u6b63");e._pattern=this;e.config=a;e.waitTo=-1;e.completed=!1;e.direction=0;e.lastDirection=0;e.speed=0;e.lastSpeed=0;e.speedH=0;e.speedV=0;e.dirIncr=0;e.dirFin=0;e.chDirEnd=-1;e.spdIncr=0;e.spdFin=0;e.chSpdEnd=-1;e.aclIncrH=0;e.aclFinH=0;e.aclIncrV=0;e.aclFinV=0;e.aclEnd=-1;e.isDanmaku=!0;return e},_createSimpleTicker:function(a){var b={},c=enchant.bulletml.AttackPattern.defaultConfig,
d;for(d in c)c.hasOwnProperty(d)&&(b[d]=c[d]);for(d in a)a.hasOwnProperty(d)&&(b[d]=a[d]);a=b;if(!a.target)throw Error("target is undefined in config.");var f=function(){this.x+=f.deltaX;this.y+=f.deltaY;f.config.isInsideOfWorld(this)||this.remove()};f.config=a;f.direction=0;f.speed=0;f.deltaX=0;f.deltaY=0;f.isDanmaku=!0;return f},_fire:function(b,c,j,m){var h={label:b.bullet.label},l;for(l in b.bullet.option)h[l]=b.bullet.option[l];if(h=c.bulletFactory(h)){var e=(l=!!b.bullet.actions.length)?m._createSimpleTicker(c):
m.createTicker(c,b.bullet),k=this;j.lastDirection=e.direction=function(b){var e=eval(b.value)*f;switch(b.type){case "aim":return c.target?a(k,c.target)+e:e-Math.PI/2;case "absolute":return e-Math.PI/2;case "relative":return j.direction+e;default:return j.lastDirection+e}}(b.direction||b.bullet.direction);j.lastSpeed=e.speed=function(a){var b=eval(a.value);switch(a.type){case "relative":return j.speed+b;case "sequence":return j.lastSpeed+b;default:return b}}(b.speed||b.bullet.speed);h.x=this.x+((this.width||
0)-(h.width||0))/2;h.y=this.y+((this.height||0)-(h.height||0))/2;l&&(e.deltaX=Math.cos(e.direction)*e.speed*c.speedRate,e.deltaY=Math.sin(e.direction)*e.speed*c.speedRate);this.updateProperties=!!this.updateProperties;if(c.updateProperties||this.updateProperties)h.rotation=j.direction*d,h.speed=j.speed;h.addEventListener("enterframe",e);h.addEventListener("removed",function(){this.removeEventListener("enterframe",e)});c.addTarget?c.addTarget.addChild(h):this.parentNode&&this.parentNode.addChild(h)}},
_changeDirection:function(b,d,j){var m=eval(b.direction.value)*f,h=eval(b.term);switch(b.direction.type){case "aim":b=d.target;if(!b)return;j.dirFin=a(this,b)+m;j.dirIncr=c(j.dirFin-j.direction)/h;break;case "absolute":j.dirFin=m-Math.PI/2;j.dirIncr=c(j.dirFin-j.direction)/h;break;case "relative":j.dirFin=j.direction+m;j.dirIncr=c(j.dirFin-j.direction)/h;break;case "sequence":j.dirIncr=m,j.dirFin=j.direction+j.dirIncr*(h-1)}j.chDirEnd=this.age+h},_changeSpeed:function(a,b){var c=eval(a.speed.value),
d=eval(a.term);switch(a.speed.type){case "absolute":b.spdFin=c;b.spdIncr=(b.spdFin-b.speed)/d;break;case "relative":b.spdFin=c+b.speed;b.spdIncr=(b.spdFin-b.speed)/d;break;case "sequence":b.spdIncr=c,b.spdFin=b.speed+b.spdIncr*d}b.chSpdEnd=this.age+d},_accel:function(a,b){var c=eval(a.term);b.aclEnd=this.age+c;if(a.horizontal){var d=eval(a.horizontal.value);switch(a.horizontal.type){case "absolute":case "sequence":b.aclIncrH=(d-b.speedH)/c;b.aclFinH=d;break;case "relative":b.aclIncrH=d,b.aclFinH=
(d-b.speedH)*c}}else b.aclIncrH=0,b.aclFinH=b.speedH;if(a.vertical)switch(d=eval(a.vertical.value),a.vertical.type){case "absolute":case "sequence":b.aclIncrV=(d-b.speedV)/c;b.aclFinV=d;break;case "relative":b.aclIncrV=d,b.aclFinV=(d-b.speedV)*c}else b.aclIncrV=0,b.aclFinV=b.speedV},bulletml:{get:function(){return this._bulletml}}});enchant.bulletml.defaultBulletFactory=function(){var a=new enchant.Sprite(8,8);a.image=enchant.bulletml.getDefaultImage();return a};var b=void 0;enchant.bulletml.defaultIsInsideOfWorld=
function(a){void 0===b&&(b=enchant.Game.instance);var c=b.width,d=b.height,f=a.height||0;return-(a.width||0)<=a.x&&a.x<c&&-f<=a.y&&a.y<d};enchant.bulletml.AttackPattern.defaultConfig={bulletFactory:enchant.bulletml.defaultBulletFactory,isInsideOfWorld:enchant.bulletml.defaultIsInsideOfWorld,rank:0,updateProperties:!1,speedRate:2};var d=180/Math.PI,f=Math.PI/180})();
