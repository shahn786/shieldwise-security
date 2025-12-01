# Run from Replit shell to sync to VPS:

# 1. Sync city views
rsync -avz --progress views/cities/ shieldwisesecurity.com:/home/shieldwisesecurity/htdocs/shieldwisesecurity.com/views/cities/

# 2. Sync data files
rsync -avz --progress data/ shieldwisesecurity.com:/home/shieldwisesecurity/htdocs/shieldwisesecurity.com/data/

# 3. Sync scripts
rsync -avz --progress scripts/ shieldwisesecurity.com:/home/shieldwisesecurity/htdocs/shieldwisesecurity.com/scripts/

# 4. SSH and restart
ssh shieldwisesecurity.com "cd /home/shieldwisesecurity/htdocs/shieldwisesecurity.com && pm2 restart shieldwise && pm2 save"