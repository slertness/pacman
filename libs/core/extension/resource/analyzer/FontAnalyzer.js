/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 * * Neither the name of the Egret-Labs.org nor the
 *   names of its contributors may be used to endorse or promote products
 *   derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var __extends = this.__extends || function (d, b) {
for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
function __() { this.constructor = d; }
__.prototype = b.prototype;
d.prototype = new __();
};
var RES;
(function (RES) {
var FontAnalyzer = (function (_super) {
__extends(FontAnalyzer, _super);
function FontAnalyzer() {
_super.call(this);
}
FontAnalyzer.prototype.analyzeConfig = function (resItem, data) {
var name = resItem.name;
var config;
var imageUrl = "";
try {
var str = data;
config = JSON.parse(str);
}
catch (e) {
}
if (config) {
imageUrl = this.getRelativePath(resItem.url, config["file"]);
}
else {
config = data;
imageUrl = this.getTexturePath(resItem.url, config);
}
this.sheetMap[name] = config;
return imageUrl;
};
FontAnalyzer.prototype.analyzeBitmap = function (resItem, data) {
var name = resItem.name;
if (this.fileDic[name] || !data) {
return;
}
var texture = data;
var config = this.sheetMap[name];
delete this.sheetMap[name];
var bitmapFont = new egret.BitmapFont(texture, config);
this.fileDic[name] = bitmapFont;
};
FontAnalyzer.prototype.getTexturePath = function (url, fntText) {
var file = "";
var lines = fntText.split("\n");
var pngLine = lines[2];
var index = pngLine.indexOf("file=\"");
if (index != -1) {
pngLine = pngLine.substring(index + 6);
index = pngLine.indexOf("\"");
file = pngLine.substring(0, index);
}
url = url.split("\\").join("/");
var index = url.lastIndexOf("/");
if (index != -1) {
url = url.substring(0, index + 1) + file;
}
else {
url = file;
}
return url;
};
/**
 * @inheritDoc
 */
FontAnalyzer.prototype.destroyRes = function (name) {
if (this.fileDic[name]) {
delete this.fileDic[name];
return true;
}
return false;
};
return FontAnalyzer;
})(RES.SheetAnalyzer);
RES.FontAnalyzer = FontAnalyzer;
FontAnalyzer.prototype.__class__ = "RES.FontAnalyzer";
})(RES || (RES = {}));
