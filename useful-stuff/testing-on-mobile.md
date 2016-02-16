# Testing on mobile

If you're using `http-server` to run a webserver from the command line, you can open your project on a mobile phone:

* Make sure your laptop and your phone are connected to the same WiFi network
* Open Network Utility to see your IP address. It'll probably be something like `192.168.35.130` (the first two numbers stay the same, the second two will often change each time you connect. It varies from network to network)
* In the same way that you can view your project locally by going to http://localhost:8080 (or http://127.0.0.1:8080 if you're Meng and you have some crazy configuration on your machine – `localhost` is just an alias for `127.0.0.1`), you can use this IP address. Open your phone's web browser and navigate to http://192.168.x.x:8080 (replacing the blanks with your IP address)
* Voila! You should now be able to see your project on your phone. Other people can also look at the project by visiting that page on their laptops, if they're on the same network.

You can also emulate a mobile device via the Chrome devtools (click the mobile phone icon next to the 'console button')...

<img width="690" alt="screen shot 2016-02-15 at 11 36 30 pm" src="https://cloud.githubusercontent.com/assets/1162160/13067352/1d4bf756-d43d-11e5-8bba-5d4a4e4e722e.png">

...but it's not the same as the real thing.
