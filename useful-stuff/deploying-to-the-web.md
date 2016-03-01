# Deploying projects to the web

There's a great service called [Surge](https://surge.sh/) which allows you to easily put projects online. Like `http-server`, it's a Node package that you can install with npm:

```bash
sudo npm install --global surge
```

Once you've installed it (you only need to do it once), you can deploy your project like so:

```bash
cd path/to/your/project
surge
```

It will probably ask you for an email address etc. Once it's done, you'll be able to see your project at yoursubdomain.surge.sh (it will randomly assign yoursubdomain, or you can specify one like `nyc-poverty-map`).

You can easily overwrite old projects (e.g. for deploying new versions), and you can unpublish them later if you want.
