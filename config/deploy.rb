set :application, "webtools"
set :user, "ubuntu"
set :domain, "175.41.198.7"
ssh_options[:keys] = ["~/.ssh/keypair-webtools.pem"]

set :scm, :git
set :repository,  "git@github.com:chinghanho/webtools.git"
set :branch, "master"

set :deploy_to, "/home/#{user}/#{application}"
set :keep_releases, 5
set :use_sudo, false
set :normalize_asset_timestamps, false
default_run_options[:pty] = true

set :default_environment, {
  "PATH" => "/home/ubuntu/.nvm/v0.10.15/bin:$PATH"
}

role :web, domain                   # Your HTTP server, Apache/etc
role :app, domain                   # This may be the same as your `Web` server
role :db,  domain, :primary => true #

namespace :deploy do

  desc "Stop Forever"
  task :stop, :roles => :app do
    run "cd #{current_path} && node_modules/forever/bin/forever stopall"
  end

  desc "Start Forever"
  task :start, :roles => :app do
    run "cd #{current_path} && node_modules/forever/bin/forever start server/server.js"
  end

  desc "Restart Forever"
  task :restart, :roles => :app do
    run "cd #{current_path} && node_modules/forever/bin/forever restartall"
  end

  desc "Refresh shared node_modules symlink to current node_modules"
  task :refresh_symlink, :roles => :app do
    run "rm -rf #{release_path}/node_modules && ln -s #{shared_path}/node_modules #{release_path}/node_modules"
    run "rm -rf #{release_path}/server/config/config.js && ln -s #{shared_path}/config/config.js #{release_path}/server/config/config.js"
    run "rm -rf #{release_path}/public/uploads/pictures/resources && ln -s #{shared_path}/uploads/pictures/resources #{release_path}/public/uploads/pictures/resources"
    run "rm -rf #{release_path}/dist && ln -s #{shared_path}/dist #{release_path}/dist"
  end

  desc "Install node modules non-globally"
  task :npm_install, :roles => :app do
    run "cd #{current_path} && npm install"
  end

  task :additional_setup, :roles => :app do
    run "mkdir -p #{shared_path}/node_modules"
    run "mkdir -p #{shared_path}/config"
    run "mkdir -p #{shared_path}/uploads/pictures/resources"
    run "mkdir -p #{shared_path}/dist"
  end

  desc "Upload config files to shared directory"
  task :upload_config, :roles => :app do
    top.upload("./server/config/config.js", "#{shared_path}/config/config.js", :via => :scp, :recursive => :true)
  end

  task :assets, :roles => :app do
    top.upload("./dist", "#{shared_path}", :via => :scp, :recursive => :true)
  end

end

before "deploy:refresh_symlink", "deploy:upload_config"
after "deploy:create_symlink", "deploy:refresh_symlink", "deploy:npm_install"
after "deploy:setup", "deploy:additional_setup"



# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts
