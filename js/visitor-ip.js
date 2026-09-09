/**
 * Fetches visitor public IP + location and fills [data-hcva-ip] elements.
 * Also updates legacy ids: ip_ad1d, hcva-ip-display, hcva-ip-location, hcva-ip-isp, hcva-ip-country.
 */
(function (global) {
  'use strict';

  var CACHE_KEY = 'hcva_popup_visitor_geo';

  function readCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeCache(geo) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(geo));
    } catch (e) {}
  }

  function normalize(data) {
    return {
      ip: data.ip || data.query || '',
      city: data.city || '',
      region: data.region || data.regionName || '',
      country: data.country_name || data.country || '',
      countryCode: (data.country_code || data.countryCode || '').toUpperCase(),
      isp: data.org || data.isp || '',
    };
  }

  function locationLine(geo) {
    var parts = [geo.city, geo.region, geo.country].filter(Boolean);
    return parts.length ? parts.join(', ') : 'Unknown location';
  }

  function setText(id, value) {
    if (!id) return;
    var el = document.getElementById(id);
    if (el) el.textContent = value || '—';
  }

  function applyGeo(geo) {
    var ip = geo.ip || 'Unavailable';
    var loc = locationLine(geo);
    var isp = geo.isp || '—';
    var country = geo.country
      ? geo.countryCode
        ? geo.country + ' (' + geo.countryCode + ')'
        : geo.country
      : '—';

    setText('ip_ad1d', ip);
    setText('hcva-ip-display', ip);
    setText('hcva-ip-location', loc);
    setText('hcva-ip-isp', isp);
    setText('hcva-ip-country', country);

    var nodes = document.querySelectorAll('[data-hcva-ip]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = ip;
    }

    nodes = document.querySelectorAll('[data-hcva-location]');
    for (var j = 0; j < nodes.length; j++) {
      nodes[j].textContent = loc;
    }

    nodes = document.querySelectorAll('[data-hcva-isp]');
    for (var k = 0; k < nodes.length; k++) {
      nodes[k].textContent = isp;
    }

    try {
      document.dispatchEvent(
        new CustomEvent('hcva-visitor-geo', { detail: geo })
      );
    } catch (e2) {}
  }

  function fetchJson(url, signal) {
    return fetch(url, { signal: signal }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    });
  }

  function fetchGeo() {
    var cached = readCache();
    if (cached && cached.ip) {
      applyGeo(cached);
      return Promise.resolve(cached);
    }

    var controller = new AbortController();
    var timeout = setTimeout(function () {
      controller.abort();
    }, 8000);

    function done(geo) {
      clearTimeout(timeout);
      writeCache(geo);
      applyGeo(geo);
      return geo;
    }

    return fetchJson('https://ipapi.co/json/', controller.signal)
      .then(function (data) {
        if (data.error) throw new Error(data.reason || 'ipapi error');
        return done(normalize(data));
      })
      .catch(function () {
        return fetchJson(
          'https://ip-api.com/json/?fields=status,message,query,city,regionName,country,countryCode,isp',
          controller.signal
        ).then(function (data) {
          if (data.status !== 'success') throw new Error(data.message || 'ip-api error');
          return done(
            normalize({
              ip: data.query,
              city: data.city,
              region: data.regionName,
              country_name: data.country,
              country_code: data.countryCode,
              org: data.isp,
            })
          );
        });
      })
      .catch(function () {
        clearTimeout(timeout);
        var fallback = normalize({});
        applyGeo(fallback);
        return fallback;
      });
  }

  function init() {
    fetchGeo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.hcvaFetchVisitorGeo = fetchGeo;
})(window);
