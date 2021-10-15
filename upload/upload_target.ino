//Test if Jenkins can upload the sketch to IoT gateway, compile the sketch and upload sketch to the arduino board properly.
//tt

void setup() {
	pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
	digitalWrite(LED_BUILTIN, HIGH);
	delay(1000);
	digitalWrite(LED_BUILTIN, LOW);
	delay(1000);
}
