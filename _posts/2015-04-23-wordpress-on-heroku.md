---
layout: post
title:  "Wordpress on Heroku"
date:   2015-09-23 20:12:00 
categories: [tutorials]
tags: [heroku, wordpress, wordpress on heroku, blogging]
excerpt: "Wordpress on Heroku is great, but difficult to setup..."
---

Wordpress on Heroku is great, but difficult to setup. You will need to sign up for <a href="http://aws.amazon.com/" target="_blank">Amazon Web Services</a> and <a href="http://heroku.com/" target="_blank">Heroku</a>. You'll need to install the Heroku toolbelt on your machine using "wget -qO- <a href="https://toolbelt.heroku.com/install-ubuntu.sh">https://toolbelt.heroku.com/install-ubuntu.sh</a> | sh". I'll assume you're running Linux for this, but I'll see about a Windows tutorial as well later on. Setting up AWS is also not going to be covered right now in this tutorial.
<ol>
	<li>The first thing to do is <a href="http://www.linux.com/learn/tutorials/288158-easy-lamp-server-installation" target="_blank">setup LAMP on your Linux machine</a>.</li>
	<li>Next get the <a href="https://wordpress.org/download/" target="_blank">latest version of Wordpress</a>. Download it and unzip the file into your "/var/www/html/" folder.</li>
	<li>Download <a href="https://wordpress.org/plugins/amazon-web-services/" target="_blank">Amazon Web Services</a> and <a href="https://wordpress.org/plugins/amazon-s3-and-cloudfront/" target="_blank">Amazon S3 and Cloudfront</a>.</li>
	<li>Unzip both of Amazon Web Services and Amazon S3 and Cloudfront into the wp-content/plugins folder.</li>
	<li>You should have been given access keys for your AWS user. Add them to your wp-config.php file like this:
    	<p class="code-snippet">// AWS Access Keys //<br>
    	define( 'AWS_ACCESS_KEY_ID', 'your_aws_access_key_id_here' );<br>
    	define( 'AWS_SECRET_ACCESS_KEY', 'your_aws_secret_access_key_here' );</p>
    </li>
	<li>Go <a href="https://api.wordpress.org/secret-key/1.1/salt/" target="_blank">here</a> and add your Unique Keys and Salts to your wp-config.php file like below:
    	<p class="code-snippet">define('AUTH_KEY', 'put your unique phrase here');<br>
    	define('SECURE_AUTH_KEY', 'put your unique phrase here');<br>
    	define('LOGGED_IN_KEY', 'put your unique phrase here');<br>
    	define('NONCE_KEY', 'put your unique phrase here');<br>
    	define('AUTH_SALT', 'put your unique phrase here');<br>
    	define('SECURE_AUTH_SALT', 'put your unique phrase here');<br>
    	define('LOGGED_IN_SALT', 'put your unique phrase here');<br>
    	define('NONCE_SALT', 'put your unique phrase here');</p>
    </li>
	<li>Go to <a href="http://localhost/wordpress/" target="_blank">localhost/wordpress/</a> and run through the installation using the MySQL credentials you setup while setting up your LAMP stack. Check <a href="http://codex.wordpress.org/Installing_WordPress" target="_blank">here </a>if you're not sure what to do.</li>
	<li>Go to your dashboard, and click on the plugins tab.</li>
	<li>Activate both the Amazon Web Services and Amazon S3 and Cloudfront plugins. There should now be another tab at the bottom that says "AWS". If your AWS User is setup correctly then they should both work immediately and allow you to connect to a bucket.</li>
	<li>Go into your wordpress folder and open a terminal session there.</li>
	<li>In your terminal type <span class="inline-snippet">$ git init</span> That'll initialize the whole thing as a git repository.</li>
	<li>In your terminal type <span class="inline-snippet">git add .</span> to get all the WP files ready to be committed. This will take a second or two.</li>
	<li>Now type <span class="inline-snippet">git commit -m 'Add your own commit message here'</span> Wait for the wall of text to stop running.</li>
	<li>Now type <span class="inline-snippet">heroku create</span> That'll create a new Heroku app from that directory.</li>
	<li>Type <span class="inline-snippet">heroku addons:add cleardb</span> If all goes well then you're almost ready to push your installation to Heroku.</li>
	<li>Copy the code below with the Unique Keys and Salts you got earlier:
    	<p class="code-snippet">heroku config:set AUTH_KEY='put your unique phrase here'<br>
    	SECURE_AUTH_KEY='put your unique phrase here'<br>
    	LOGGED_IN_KEY='put your unique phrase here'<br>
    	NONCE_KEY='put your unique phrase here'<br>
    	AUTH_SALT='put your unique phrase here'<br>
    	SECURE_AUTH_SALT='put your unique phrase here'<br>
    	LOGGED_IN_SALT='put your unique phrase here'<br>
    	NONCE_SALT='put your unique phrase here'</p>
    </li>
	<li>Again in the terminal type <span class="inline-snippet">git checkout -b production</span> You'll store your production environment variables here.</li>
	<li>Add this line to your wp-config.php file:
	    <p class="code-snippet">$db = parse_url($_ENV["CLEARDB_DATABASE_URL"]);</p>
    </li>
	<li>Change your database information in wp-config.php to the code below:
    	<p class="code-snippet">define('DB_NAME', trim($db["path"],"/"));<br>
    	define('DB_USER', $db["user"]);<br>
    	define('DB_PASSWORD', $db["pass"]);<br>
    	define('DB_HOST', $db["host"]);</p>
    </li>
	<li>Change your Unthentication Unique Keys and Salts to the below:
    	<p class="code-snippet">define('AUTH_KEY', getenv('AUTH_KEY'));<br>
    	define('SECURE_AUTH_KEY', getenv('SECURE_AUTH_KEY'));<br>
    	define('LOGGED_IN_KEY', getenv('LOGGED_IN_KEY'));<br>
    	define('NONCE_KEY', getenv('NONCE_KEY'));<br>
    	define('AUTH_SALT', getenv('AUTH_SALT'));<br>
    	define('SECURE_AUTH_SALT', getenv('SECURE_AUTH_SALT'));<br>
    	define('LOGGED_IN_SALT', getenv('LOGGED_IN_SALT'));<br>
    	define('NONCE_SALT', getenv('NONCE_SALT'));<br>
    	define('AWS_ACCESS_KEY_ID', getenv('AWS_ACCESS_KEY_ID'));<br>
    	define('AWS_SECRET_ACCESS_KEY', getenv('AWS_SECRET_ACCESS_KEY'));</p>
    </li>
	<li>Now you're all set. Type <span class="inline-snippet">git push heroku production:master</span> and let it finish. When that's done you can go to "http://yourwordpressapp.heroku.com" and complete your remote installation.
<ol>
	<li>In order to check out your remote installation simply switch back to the master branch with <span class="inline-snippet">git checkout master</span></li>
</ol>
</li>
</ol>
<strong>Updating Wordpress</strong>

If you need to update Wordpress (mine updated twice while I was working on this) you'll need to take a few steps:
<ol>
	<li>In a terminal in the html folder run <span class="inline-snippet">sudo chown -R www-data:www-data wordpress/</span> That'll let you update wordpress locally through the app.</li>
	<li>Make sure you're on the master branch and update WP via the dashboard.</li>
	<li>Once Wordpress is finished updating run <span class="inline-snippet">sudo chown -R your_user:your_user wordpress/</span> Now you'll be able to edit the folder yourself again.</li>
	<li>Commit the changes made by the update.</li>
	<li>Switch to the production branch and merge with master by running <span class="inline-snippet">git merge master</span> This shouldn't create any conflicts (it didn't with me).</li>
	<li>The wp-config file should be untouched, but check it just in case. If it doesn't have your production settings, simply edit the file again, and commit changes.</li>
	<li>Now run <span class="inline-snippet">git push heroku production:master</span> again, wait and your remote installation will be updated.
<ul>
	<li>Remember to switch back to the master branch to get your local installation working again.</li>
</ul>
</li>
</ol>
<strong>Adding/updating themes and plugins</strong>

Adding/updating themes and plugins is easy.
<ol>
	<li>Download the theme or plugin.</li>
	<li>Make sure you're in your master branch. Unzip the theme/folder into it's respective folder.</li>
	<li>In your local installation active the theme or plugin.</li>
	<li>Commit the changes, then switch to production.</li>
	<li>Run <span class="inline-snippet">git merge master</span> This should not create any conflicts if the plugin/theme is new.
<ul>
	<li>If you're updating a conflict might be caused. If so, then in the terminal type <span class="inline-snippet">git reset --hard</span></li>
	<li>Delete the older plugin/theme and replace with the new one, then merge again.</li>
</ul>
</li>
	<li>The wp-config file should be untouched, but check it just in case. If it doesn't have your production settings, simply edit the file again, and commit changes.</li>
	<li>Now run <span class="inline-snippet">git push heroku production:master</span> again, wait and your remote installation should now have the plugin/theme.
<ul>
	<li>Go to "http://yourwordpressapp.heroku.com/wp-admin" and Wordpress might ask you to update the database. Simply go ahead and everything should work fine.</li>
</ul>
</li>
</ol>