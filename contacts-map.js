function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    const orgCoordinates = [58.012571, 56.010168];
    
    const myMap = new ymaps.Map("map", {
        center: orgCoordinates,
        zoom: 17,
        controls: ['zoomControl', 'fullscreenControl']
    });
    
    const orgPlacemark = new ymaps.Placemark(orgCoordinates, {
        hintContent: 'Coffee Soul',
        balloonContent: '<strong>Coffee Soul</strong><br>г. Пермь, ул. Магистральная, 89/2'
    }, {
        preset: 'islands#redDotIconWithCaption'
    });
    
    myMap.geoObjects.add(orgPlacemark);
    
    const statusDiv = document.getElementById('geoStatus');
    
    ymaps.geolocation.get({
        provider: 'browser',
        mapStateAutoApply: false
    }).then(function(result) {
        const userCoordinates = result.geoObjects.position;
        
        const userPlacemark = new ymaps.Placemark(userCoordinates, {
            hintContent: 'Вы здесь',
            balloonContent: 'Ваше текущее местоположение'
        }, {
            preset: 'islands#blueCircleDotIconWithCaption'
        });
        
        myMap.geoObjects.add(userPlacemark);
        
        function getDistance(lat1, lon1, lat2, lon2) {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return (R * c).toFixed(1);
        }
        
        const distance = getDistance(userCoordinates[0], userCoordinates[1], orgCoordinates[0], orgCoordinates[1]);
        if (statusDiv) {
            statusDiv.innerHTML = 'Ваше местоположение определено! Расстояние до Coffee Soul: ' + distance + ' км';
        }
        
        const bounds = ymaps.util.bounds.fromPoints([orgCoordinates, userCoordinates]);
        myMap.setBounds(bounds, {
            checkZoomRange: true,
            zoomMargin: 50,
            duration: 1000
        });
        
    }, function(err) {
        if (statusDiv) {
            statusDiv.innerHTML = 'Не удалось определить местоположение. Разрешите доступ к геолокации. Адрес: г. Пермь, ул. Магистральная, 89/2';
        }
        myMap.setCenter(orgCoordinates, 16);
    });
}

ymaps.ready(initMap);