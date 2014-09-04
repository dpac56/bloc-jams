(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("scripts/album", function(exports, require, module) {
 var createSongRow = function(songNumber, songName, songLength){
  var template = 
  '<tr>'
     + '  <td class="col-md-1">' + songNumber + '</td>'
     + '  <td class="col-md-9">' + songName + '</td>'
     + '  <td class="col-md-2">' + songLength + '</td>'
     + '</tr>'
     ;

  return $(template);
 }


 var albumPicasso = {
   name: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: '/images/album-placeholder.png',
   songs: [
       { name: 'Blue', length: '4:26' },
       { name: 'Green', length: '3:14' },
       { name: 'Red', length: '5:01' },
       { name: 'Pink', length: '3:21'},
       { name: 'Magenta', length: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
   name: 'The Telephone',
   artist: 'Guglielmo Marconi',
   label: 'EM',
   year: '1909',
   albumArtUrl: '/images/album-placeholder.png',
   songs: [
       { name: 'Hello, Operator?', length: '1:01' },
       { name: 'Ring, ring, ring', length: '5:01' },
       { name: 'Fits in your pocket', length: '3:21'},
       { name: 'Can you hear me now?', length: '3:14' },
       { name: 'Wrong phone number', length: '2:15'}
     ]
 };


if(document.URL.match(/\/album.html/)){
  $(document).ready(function(){
    //var album = albumMarconi;

    changeAlbumView(albumMarconi);
    
  });
}


var changeAlbumView = function(album){
   //var album = albumMarconi;

    var $albumTitle = $('.album-title');
    $albumTitle.text(album.name);

    var $albumArtist = $('.album-artist');
    $albumArtist.text(album.artist);

    var $albumMeta = $('.album-meta-info');
    $albumMeta.text(album.year + " on " + album.label);

    var $albumImage = $('.album-image img');
    $albumImage.attr('src', album.albumArtUrl);

    var $songList = $('.album-song-listing');
    $songList.empty();

    var songs = album.songs;
    for (i = 0; i < songs.length; i++){
      $songList.append(createSongRow(i+1, album.songs[i].name, album.songs[i].length));
    }
};

});

;require.register("scripts/app", function(exports, require, module) {
require("./landing");
require('./album');
});

;require.register("scripts/landing", function(exports, require, module) {
$(document).ready(function(){
  $('.hero-content h3').click(function(){
    subtext = $(this).text();
    $(this).text(subtext + '!');
  });  

  var onHoverAction = function(event){
    $(this).animate({'margin-top':'10px'});
  };

  var offHoverAction = function(event){
    $(this).animate({'margin-top':'0px'});
  };

  $('.selling-points .point').hover(onHoverAction, offHoverAction);
});
});

;
//# sourceMappingURL=app.js.map