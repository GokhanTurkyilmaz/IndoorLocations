# IndoorLocations
Bu projede 3 BLE Gateway ve 1 Beacon kullanılmıştır. Demo olarak yapılmaktadır. -Gatewaylar HTTP protokolü ile api ye post işlemi gerçekleştirmekte. -Post ile bu gelen istekleri in-memory cache ile cachelenmek te. -Front-end tarafta da ajax ile controlllere get isteği atılarak cache den RSSI verileri alınmakta. -Alınan bu veriler trilateration algoritmasına sunulmakta.
