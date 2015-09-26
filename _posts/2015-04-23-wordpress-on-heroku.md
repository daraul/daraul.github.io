---
layout: post
title:  "Wordpress on Heroku"
date:   2015-09-23 20:12:00 
categories: wordpress heroku jekyll
---

Wordpress on Heroku is great, but difficult to setup. You will need to sign up for <a href="http://aws.amazon.com/" target="_blank">Amazon Web Services</a> and <a href="http://heroku.com/" target="_blank">Heroku</a>. You'll need to install the Heroku toolbelt on your machine using "wget -qO- <a href="https://toolbelt.heroku.com/install-ubuntu.sh">https://toolbelt.heroku.com/install-ubuntu.sh</a> | sh". I'll assume you're running Linux for this, but I'll see about a Windows tutorial as well later on. Setting up AWS is also not going to be covered right now in this tutorial.
<ol>
	<li>The first thing to do is <a href="http://www.linux.com/learn/tutorials/288158-easy-lamp-server-installation" target="_blank">setup LAMP on your Linux machine</a>.</li>
	<li>Next get the <a href="https://wordpress.org/download/" target="_blank">latest version of Wordpress</a>. Download it and unzip the file into your "/var/www/html/" folder.</li>
	<li>Download <a href="https://wordpress.org/plugins/amazon-web-services/" target="_blank">Amazon Web Services</a> and <a href="https://wordpress.org/plugins/amazon-s3-and-cloudfront/" target="_blank">Amazon S3 and Cloudfront</a>.</li>
	<li>Unzip both of Amazon Web Services and Amazon S3 and Cloudfront into the wp-content/plugins folder.</li>
	<li>You should have been given access keys for your AWS user. Add them to your wp-config.php file like this:
<ul>
	<li>// AWS Access Keys //</li>
	<li>define( 'AWS_ACCESS_KEY_ID', 'your_aws_access_key_id_here' );</li>
	<li>define( 'AWS_SECRET_ACCESS_KEY', 'your_aws_secret_access_key_here' );</li>
</ul>
</li>
	<li>Go <a href="https://api.wordpress.org/secret-key/1.1/salt/" target="_blank">here</a> and add your Unique Keys and Salts to your wp-config.php file like below:
<ul>
	<li>define('AUTH_KEY', 'put your unique phrase here');</li>
	<li>define('SECURE_AUTH_KEY', 'put your unique phrase here');</li>
	<li>define('LOGGED_IN_KEY', 'put your unique phrase here');</li>
	<li>define('NONCE_KEY', 'put your unique phrase here');</li>
	<li>define('AUTH_SALT', 'put your unique phrase here');</li>
	<li>define('SECURE_AUTH_SALT', 'put your unique phrase here');</li>
	<li>define('LOGGED_IN_SALT', 'put your unique phrase here');</li>
	<li>define('NONCE_SALT', 'put your unique phrase here');</li>
</ul>
</li>
	<li>Go to <a href="http://localhost/wordpress/" target="_blank">localhost/wordpress/</a> and run through the installation using the MySQL credentials you setup while setting up your LAMP stack. Check <a href="http://codex.wordpress.org/Installing_WordPress" target="_blank">here </a>if you're not sure what to do.</li>
	<li>Go to your dashboard, and click on the plugins tab.</li>
	<li>Activate both the Amazon Web Services and Amazon S3 and Cloudfront plugins. There should now be another tab at the bottom that says "AWS". If your AWS User is setup correctly then they should both work immediately and allow you to connect to a bucket.</li>
	<li>Go into your wordpress folder and open a terminal session there.</li>
	<li>In your terminal type "$ git init". That'll initialize the whole thing as a git repository.</li>
	<li>In your terminal type "git add ." to get all the WP files ready to be committed. This will take a second or two.</li>
	<li>Now type "git commit -m 'Add your own commit message here'". Wait for the wall of text to stop running.</li>
	<li>Now type "heroku create". That'll create a new Heroku app from that directory.</li>
	<li>Type "heroku addons:add cleardb". If all goes well then you're almost ready to push your installation to Heroku.</li>
	<li>Copy the code below with the Unique Keys and Salts you got earlier:
<ul>
	<li>heroku config:set AUTH_KEY='put your unique phrase here'</li>
	<li>SECURE_AUTH_KEY='put your unique phrase here'</li>
	<li>LOGGED_IN_KEY='put your unique phrase here'</li>
	<li>NONCE_KEY='put your unique phrase here'</li>
	<li>AUTH_SALT='put your unique phrase here'</li>
	<li>SECURE_AUTH_SALT='put your unique phrase here'</li>
	<li>LOGGED_IN_SALT='put your unique phrase here'</li>
	<li>NONCE_SALT='put your unique phrase here'</li>
</ul>
</li>
	<li>Again in the terminal type "git checkout -b production". You'll store your production environment variables here.</li>
	<li>Add this line to your wp-config.php file:
<ul>
	<li>$db = parse_url($_ENV["CLEARDB_DATABASE_URL"]);</li>
</ul>
</li>
	<li>Change your database information in wp-config.php to the code below:
<ul>
	<li>define('DB_NAME', trim($db["path"],"/"));</li>
	<li>define('DB_USER', $db["user"]);</li>
	<li>define('DB_PASSWORD', $db["pass"]);</li>
	<li>define('DB_HOST', $db["host"]);</li>
</ul>
</li>
	<li>Change your Unthentication Unique Keys and Salts to the below:
<ul>
	<li>define('AUTH_KEY', getenv('AUTH_KEY'));</li>
	<li>define('SECURE_AUTH_KEY', getenv('SECURE_AUTH_KEY'));</li>
	<li>define('LOGGED_IN_KEY', getenv('LOGGED_IN_KEY'));</li>
	<li>define('NONCE_KEY', getenv('NONCE_KEY'));</li>
	<li>define('AUTH_SALT', getenv('AUTH_SALT'));</li>
	<li>define('SECURE_AUTH_SALT', getenv('SECURE_AUTH_SALT'));</li>
	<li>define('LOGGED_IN_SALT', getenv('LOGGED_IN_SALT'));</li>
	<li>define('NONCE_SALT', getenv('NONCE_SALT'));</li>
	<li>define('AWS_ACCESS_KEY_ID', getenv('AWS_ACCESS_KEY_ID'));</li>
	<li>define('AWS_SECRET_ACCESS_KEY', getenv('AWS_SECRET_ACCESS_KEY'));</li>
</ul>
</li>
	<li>Now you're all set. Type "git push heroku production:master" and let it finish. When that's done you can go to "http://yourwordpressapp.heroku.com" and complete your remote installation.
<ol>
	<li>In order to check out your remote installation simply switch back to the master branch with "git checkout master"</li>
</ol>
</li>
</ol>
<strong>Updating Wordpress</strong>

If you need to update Wordpress (mine updated twice while I was working on this) you'll need to take a few steps:
<ol>
	<li>In a terminal in the html folder run "sudo chown -R www-data:www-data wordpress/". That'll let you update wordpress locally through the app.</li>
	<li>Make sure you're on the master branch and update WP via the dashboard.</li>
	<li>Once Wordpress is finished updating run "sudo chown -R your_user:your_user wordpress/". Now you'll be able to edit the folder yourself again.</li>
	<li>Commit the changes made by the update.</li>
	<li>Switch to the production branch and merge with master by running "git merge master". This shouldn't create any conflicts (it didn't with me).</li>
	<li>The wp-config file should be untouched, but check it just in case. If it doesn't have your production settings, simply edit the file again, and commit changes.</li>
	<li>Now run "git push heroku production:master" again, wait and your remote installation will be updated.
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
	<li>Run "git merge master". This should not create any conflicts if the plugin/theme is new.
<ul>
	<li>If you're updating a conflict might be caused. If so, then in the terminal type "git reset --hard".</li>
	<li>Delete the older plugin/theme and replace with the new one, then merge again.</li>
</ul>
</li>
	<li>The wp-config file should be untouched, but check it just in case. If it doesn't have your production settings, simply edit the file again, and commit changes.</li>
	<li>Now run "git push heroku production:master" again, wait and your remote installation should now have the plugin/theme.
<ul>
	<li>Go to "http://yourwordpressapp.heroku.com/wp-admin" and Wordpress might ask you to update the database. Simply go ahead and everything should work fine.</li>
</ul>
</li>
</ol>